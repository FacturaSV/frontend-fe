import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');

        let request = req;
        if (token) {
            request = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // El backend respondió con 401, entonces borramos los tokens
                    localStorage.removeItem('access_token');
                    sessionStorage.removeItem('access_token');

                    // Podés redirigir o hacer logout también si querés
                    this.router.navigate(['/auth/login']);
                }
                return throwError(() => error);
            }),
        );
    }
}
