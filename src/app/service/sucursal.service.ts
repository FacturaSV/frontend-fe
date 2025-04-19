import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

// src/app/shared/catalogos.ts
export const TIPOS_ESTABLECIMIENTO = [
    { codigo: '01', valor: 'Matriz', descripcion: 'Oficina principal del emisor' },
    { codigo: '02', valor: 'Sucursal', descripcion: 'Establecimiento secundario o punto de venta' },
    { codigo: '04', valor: 'Establecimiento móvil', descripcion: 'Vendedores ambulantes, ferias, etc.' },
    { codigo: '07', valor: 'Establecimiento virtual', descripcion: 'Operaciones a través de medios digitales' },
    { codigo: '20', valor: 'Otros', descripcion: 'Otros tipos de establecimientos según normativa' },
];


export interface SucursalFilter {
    data: Sucursal[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface Sucursal {
    id?: number;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    codPuntoVenta?: string;
    codPuntoVentaMH?: string;
    codigoDte?: string;
    codEstable?: string;
    codEstableMH?: string;
    tipoEstablecimiento?: string;
    municipioId?: number;
    departamentoId?: number;
    estadoRt?: string;
    empresaId?: number;
    createdBy?: number;
    updatedBy?: number;
    deletedBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@Injectable({ providedIn: 'root' })
export class SucursalService {
    private backendUrl = `${environment.backendUrl}/sucursal`;

    constructor(private http: HttpClient) {}

    private getHeaders(transactionId?: string, tenantSchema?: string, tenantCode?: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId || 'NO_TRANSACTION_ID',
            'x-tenant-schema': tenantSchema || 'default_schema',
        });
    }

    getSucursales(page: number, limit: number, transactionId?: string, schema?: string, tenantCode?: string): Observable<Sucursal[]> {
        const headers = this.getHeaders(transactionId, schema, tenantCode);
        const params = new HttpParams().set('page', page).set('limit', limit);
        return this.http.get<any>(this.backendUrl, { headers, params }).pipe(
            map((res) => res?.data?.data || []),
            catchError(this.handleError),
        );
    }

    getSucursalById(id: number, transactionId?: string, schema?: string): Observable<Sucursal> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.get<any>(`${this.backendUrl}/${id}`, { headers }).pipe(
            map((res) => res?.data),
            catchError(this.handleError),
        );
    }

    createSucursal(dto: Sucursal, transactionId?: string, schema?: string, tenantCode?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema, tenantCode);
        return this.http.post(this.backendUrl, dto, { headers }).pipe(catchError(this.handleError));
    }

    updateSucursal(id: number, dto: Sucursal, transactionId?: string, schema?: string, tenantCode?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema, tenantCode);
        return this.http.put(`${this.backendUrl}/${id}`, dto, { headers }).pipe(catchError(this.handleError));
    }

    deleteSucursal(id: number, transactionId?: string, schema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.delete(`${this.backendUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
    }

    buscarSucursales(
        filtros: {
            AND?: { columna: string; operador: string; valor: string }[];
            OR?: { columna: string; operador: string; valor: string }[];
        },
        transactionId?: string,
        schema?: string,
        page: number = 1,
        limit: number = 10,
    ): Observable<SucursalFilter> {
        const headers = this.getHeaders(transactionId, schema);
        const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

        return this.http.post<any>(`${this.backendUrl}/buscar`, filtros, { headers, params }).pipe(
            map((res) => res?.data || []),
            catchError(this.handleError),
        );
    }

    private handleError(error: any) {
        console.error('❌ Error en SucursalService:', error);
        return throwError(() => new Error(error?.message || 'Error desconocido al procesar sucursales'));
    }
}
