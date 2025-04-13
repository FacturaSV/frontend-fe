import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Empresa } from './empresa.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClienteService {
    private backendUrl = `${environment.backendUrl}/cliente`; // URL del backend

    constructor(private http: HttpClient) {}

    private getHeaders(transactionId?: string, tenantSchema?: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId || 'NO_TRANSACTION_ID',
            'x-tenant-schema': tenantSchema || 'default_schema',
        });
    }

    buscarClientesPorEmpresa(
        filtros: {
            AND?: { columna: string; operador: string; valor: any }[];
            OR?: { columna: string; operador: string; valor: any }[];
        },
        empresaId: number,
        page: number = 1,
        limit: number = 10,
        transactionId?: string,
        tenantSchema?: string,
    ): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        const params = new HttpParams().set('empresa', empresaId.toString()).set('page', page.toString()).set('limit', limit.toString());
        return this.http.post<any>(`${this.backendUrl}/empresa`, filtros, { headers, params }).pipe(catchError(this.handleError));
    }


    buscarClientesById(
        clienteId: number,
        transactionId?: string,
        tenantSchema?: string,
    ): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.get<any>(`${this.backendUrl}/${clienteId}`, { headers }).pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('Error en ClienteService:', error);
        return throwError(() => new Error(error?.message || 'Error desconocido en la API'));
    }
}
