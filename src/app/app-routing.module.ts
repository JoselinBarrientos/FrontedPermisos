import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { CoordinacionComponent } from './components/coordinacion/coordinacion.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'permisos', component: PermisosComponent, canActivate: [AuthGuard] },
  { path: 'formulario', component: FormularioComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'coordinacion', component: CoordinacionComponent, canActivate: [AuthGuard] },
  { path: 'loginAdmin', component: LoginAdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
