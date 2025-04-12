import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private ngZone: NgZone,
    ) {}

    canActivate(): boolean {

        const token = localStorage.getItem('access_token');

        if (token && !this.isTokenExpired(token)) {
            console.warn('Usuario ya autenticado. Redirigiendo al dashboard...');
            this.ngZone.run(() => {
                this.router.navigate(['/dashboard']);
            });
            return false;
        }
        return true;
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar payload
            const expiry = payload.exp * 1000; // Convertir a milisegundos
            return Date.now() > expiry; // Comparar con la fecha actual
        } catch (error) {
            console.error('Error al verificar el token:', error);
            return true; // Si falla la validación, asumimos que está expirado
        }
    }
}
