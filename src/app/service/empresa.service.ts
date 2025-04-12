import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Empresa {
    id?: number;
    nombre: string;
    logo?: string;
    dirrecion?: string;
    nit?: string;
    nrc?: string;
    telefono?: string;
    actividadEconomica?: string;
    correo?: string;
    keycloakGroupId?: string;
    facturasPermitidas?: number;
    facturasUtilizadas?: number;
    userAdminCant?: number;
    userDedicadosCant?: number;
    estadoRt?: string;
}

@Injectable({
    providedIn: 'root',
})
export class EmpresaService {
    private apiUrl = 'http://localhost:3000/empresa'; // Reemplaza con la URL de tu API

    constructor(private http: HttpClient) {}

    private getHeaders(transactionId?: string, tenantSchema?: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId || 'NO_TRANSACTION_ID',
            'x-tenant-schema': tenantSchema || 'default_schema',
        });
    }

    // Obtener todas las empresas con paginación
    getEmpresas(page: number = 1, limit: number = 10, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`, { headers }).pipe(catchError(this.handleError));
    }

    // Obtener una empresa por ID
    getEmpresaById(id: number, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
    }

    // Obtener una empresa por Keycloak Group ID
    getEmpresaByGroup(group: string, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.patch<any>(`${this.apiUrl}`, { headers })
            .pipe(
                map(response => response?.data),  // ✅ Extrae solo el `data` de la respuesta
                catchError(this.handleError)
            );
    }


    // Crear una nueva empresa
    createEmpresa(empresa: Empresa, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.post<any>(this.apiUrl, empresa, { headers }).pipe(catchError(this.handleError));
    }

    // Actualizar una empresa por ID
    updateEmpresa(id: number, empresa: Empresa, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.put<any>(`${this.apiUrl}/${id}`, empresa, { headers }).pipe(catchError(this.handleError));
    }

    // Eliminar una empresa por ID
    deleteEmpresa(id: number, transactionId?: string, tenantSchema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, tenantSchema);
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
    }

    // Manejo de errores
    private handleError(error: any) {
        console.error('❌ Error en el servicio de empresa:', error);
        return throwError(() => new Error(error?.message || 'Error desconocido en la API'));
    }
}
