import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisService } from '../../Services/apis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  
  datos: any;
  municipios: any;
  roles: any;

  constructor(private http: HttpClient, private apisService: ApisService, private toastr: ToastrService) { }


  ngOnInit() {
    this.consumirAPI();
    this.getListaMunicipios();
    this.getListaRoles();
  }

  consumirAPI() {
    const url = 'https://26.175.140.239:7018/api/Persona';
    this.apisService.get(url).subscribe({
      next: (response: any) => {
        this.datos = response; // Asignar la respuesta a una propiedad del componente
        console.log(this.datos); // Mostrar los datos en la consola
      },
      error: (error: any) => {
        console.log(error); // Manejar el error en caso de que ocurra
      }
    });
  }

  getListaMunicipios() {
    const url = 'https://26.175.140.239:7018/api/Municipio';
    this.apisService.get(url).subscribe({
      next: (response: any) => {
        this.municipios = response; // Asignar la respuesta a una propiedad del componente
        console.log(this.municipios); // Mostrar los datos en la consola
      },
      error: (error: any) => {
        console.log(error); // Manejar el error en caso de que ocurra
      }
    });
  }

  getListaRoles() {
    const url = 'https://26.175.140.239:7018/api/Rol';
    this.apisService.get(url).subscribe({
      next: (response: any) => {
        this.roles = response; // Asignar la respuesta a una propiedad del componente
        console.log(this.roles); // Mostrar los datos en la consola
      },
      error: (error: any) => {
        console.log(error); // Manejar el error en caso de que ocurra
      }
    });
  }

  agregarUsuario() {

    // Obtener los datos del formulario modal
    const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    const apellido = (<HTMLInputElement>document.getElementById('apellido')).value;
    const genero = (<HTMLInputElement>document.getElementById('genero')).value;
    const telefono = (<HTMLInputElement>document.getElementById('telefono')).value;
    const fechaNacimiento = (<HTMLInputElement>document.getElementById('fechaNacimiento')).value;
    const carnet = (<HTMLInputElement>document.getElementById('carnet')).value;
    const rol = (<HTMLSelectElement>document.getElementById('rol')).value;
    const municipio = (<HTMLSelectElement>document.getElementById('municipio')).value;
    const correo = (<HTMLInputElement>document.getElementById('email')).value;
  

    // Validar campos requeridos
  if (!nombre || !apellido || !genero || !telefono || !fechaNacimiento || !carnet || !rol || !municipio || !correo) {
    this.toastr.error('Por favor complete todos los campos');
    return;
  }


   // Objeto de usuario, para enviar el POST a la API
    const usuario = {
      id_rol: parseInt(rol),
      nombre: nombre,
      apellido: apellido,
      genero: genero,
      telefono: telefono,
      fecha_nacimiento: fechaNacimiento,
      carne: carnet,
      id_municipio: parseInt(municipio),
      correo: correo
    };
  
    const url = 'https://26.175.140.239:7018/api/Persona';


    this.apisService.post(url, usuario).subscribe({
      next: (response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        console.log(response);
        // Actualizar la lista de personas después de agregar un usuario
        this.consumirAPI();

        // Cerrar el modal después de agregar un usuario
        document.getElementById('modal')?.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        const modalBackdrop = document.getElementsByClassName('modal-backdrop');
        if (modalBackdrop.length > 0) {
          document.body.removeChild(modalBackdrop[0]);
        }

        this.toastr.success('Usuario agregado correctamente');
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Ocurrió un error al agregar el usuario');
      }
    });
  }
 
  eliminarUsuario(id: number) {
    // console.log(id);
    const url = `https://26.175.140.239:7018/api/Persona/${id}`;
    this.http.delete(url).subscribe({
      next: (response: any) => {
        this.toastr.success('Usuario eliminado correctamente');
        this.consumirAPI(); // Actualizar la lista después de eliminar el usuario
      },
      error: (error: any) => {
        this.toastr.error('Ocurrió un error al eliminar el usuario');
        console.log(error);
      }
    });
  }    
    
}
