import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private backendUrl = environment.backendUrl; // URL del backend

    constructor(private http: HttpClient) {}

    /**
     * Realiza el login en el backend
     * @param username Nombre de usuario
     * @param password Contraseña
     * @param realm Nombre del realm (dinámico)
     */
    login(username: string, password: string): Promise<boolean> {
        const loginUrl = `${this.backendUrl}/auth/login`;
        const transactionId = v4();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId,
        });

        return this.http
            .post<any>(loginUrl, { username, password }, { headers })
            .toPromise()
            .then((data) => {
                this.storeTokens(data.token.access_token, data.token.refresh_token);
                return true;
            })
            .catch((error) => {
                console.error('Error al iniciar sesión:', error);
                return false;
            });
    }

    /**
     * Cierra sesión eliminando los tokens almacenados
     */
    logout(): void {
        this.clearTokens();
        console.log('✅ Sesión cerrada exitosamente');
    }

    /**
     * Obtiene el token de acceso almacenado
     */
    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    /**
     * Obtiene el token de refresco almacenado
     */
    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    /**
     * Guarda los tokens en localStorage
     */
    private storeTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }

    /**
     * Borra los tokens almacenados
     */
    private clearTokens(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}
