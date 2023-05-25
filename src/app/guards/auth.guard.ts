// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: SocialAuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.authState.pipe(
//       tap((user: SocialUser | null) => {
//         if (!user) {
//           // Usuario no autenticado, redirigir al componente de login
//           this.router.navigate(['/login']);
//         }
//       }),
//       map((user: SocialUser | null) => !!user) // Convertir a booleano
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      take(1), // Tomar solo el primer valor emitido
      map((user: SocialUser | null) => !!user), // Convertir a booleano
      tap((authenticated: boolean) => {
        if (!authenticated) {
          // Usuario no autenticado, redirigir al componente de login
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
