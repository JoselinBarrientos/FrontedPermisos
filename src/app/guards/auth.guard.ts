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
        console.log(authenticated)
        if (!authenticated) {
          // Usuario no autenticado, redirigir al componente de login
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
