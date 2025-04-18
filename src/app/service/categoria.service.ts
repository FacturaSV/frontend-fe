import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Categoria {
    id?: number;
    nombre: string;
    descripcion?: string;
    nivel?: number;
    categoriaPadreId?: number | null;
    subcategorias?: Categoria[];
    empresaId?: number;
}

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    private backendUrl = `${environment.backendUrl}/categoria`;

    constructor(private http: HttpClient) {}

    private getHeaders(transactionId?: string, tenantSchema?: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId || 'NO_TRANSACTION_ID',
            'x-tenant-schema': tenantSchema || 'default_schema',
        });
    }

    // Obtener categorías en árbol
    getCategorias(nivel: number, transactionId?: string, schema?: string): Observable<Categoria[]> {
        const headers = this.getHeaders(transactionId, schema);
        const params = new HttpParams().set('level', nivel.toString());

        return this.http.get<any>(`${this.backendUrl}`, { headers, params }).pipe(
            map((res) => res?.data?.data || []),
            catchError(this.handleError),
        );
    }

    getCategoriasNivel(nivel: number, transactionId?: string, schema?: string): Observable<Categoria[]> {
        const headers = this.getHeaders(transactionId, schema);
        const body: any = {
            AND: [
                {
                    columna: 'nivel',
                    operador: '=',
                    valor: '' + nivel,
                },
            ],
            OR: [],
        };

        return this.http.post<any>(`${this.backendUrl}/buscar`, body, { headers }).pipe(
            map((res) => res?.data || []),
            catchError(this.handleError),
        );
    }

    // Obtener una categoría por ID
    getCategoriaById(id: number, transactionId?: string, schema?: string): Observable<Categoria> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.get<any>(`${this.backendUrl}/${id}`, { headers }).pipe(
            map((res) => res?.data),
            catchError(this.handleError),
        );
    }

    // Crear categoría
    createCategoria(dto: Categoria, transactionId?: string, schema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.post(this.backendUrl, dto, { headers }).pipe(catchError(this.handleError));
    }

    // Actualizar categoría
    updateCategoria(id: number, dto: Categoria, transactionId?: string, schema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.put(`${this.backendUrl}/${id}`, dto, { headers }).pipe(catchError(this.handleError));
    }

    // Eliminar categoría (soft delete o permanente según backend)
    deleteCategoria(id: number, transactionId?: string, schema?: string): Observable<any> {
        const headers = this.getHeaders(transactionId, schema);
        return this.http.delete(`${this.backendUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
    }

    // Manejo de errores
    private handleError(error: any) {
        console.error('❌ Error en CategoriaService:', error);
        return throwError(() => new Error(error?.message || 'Error desconocido al procesar categorías'));
    }
}
