import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { v4 } from 'uuid';

export interface ActEconomicaItem {
    id: number;
    valor: string;
    codigo: string;
    descripcion: string;
}

export interface CatalogoItem {
    id: number;
    valor: string;
    codigo: string;
}

export interface CatalogosAgrupados {
    [clave: string]: CatalogoItem[];
}

export interface EmpresaInfoStore {
    empresa: {
        id: number;
        nombre: string;
        logo?: string;
        direccion?: string;
        nit?: string;
        nrc?: string;
        telefono?: string;
        correo?: string;
        keycloakGroupId?: string;
        facturasPermitidas?: number;
        facturasUtilizadas?: number;
        userAdminCant?: number;
        userDedicadosCant?: number;
        createdAt?: string;
        updatedAt?: string;
        estadoRt?: string;
        tipoDocumento?: string | null;
    };
    sucursales: {
        id: number;
        nombre: string;
        direccion?: string;
        telefono?: string;
        email?: string;
        codPuntoVenta?: string;
        codPuntoVentaMH?: string;
        tipoEstablecimiento?: string;
        municipioId?: number;
        departamentoId?: number;
        estadoRt?: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: number | null;
        updatedBy?: number | null;
        deletedBy?: number | null;
        empresaId?: number;
        codigoDte?: string;
        codEstable?: string;
        codEstableMH?: string;
    }[];
    actsEconomica: {
        empresaId: number;
        actividadEconomicaId: number;
        id: number;
        codigo: string;
        valor: string;
        descripcion: string;
    }[];
    documentosDte: {
        id: number;
        codigo: string;
        abreviatura: string;
        valor: string;
        descripcion: string;
        ambienteId: number;
        createdAt: string;
        updatedAt: string;
    }[];
}

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private backendUrl = environment.backendUrl; // URL del backend

    constructor(private http: HttpClient) {}

    async onLoadEmpresaInfo(): Promise<boolean> {
        const empresaInfoUrl = `${this.backendUrl}/empresa/token`;
        const transactionId = v4();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId,
        });

        return this.http
            .get<any>(empresaInfoUrl, { headers })
            .toPromise()
            .then((response) => {
                this.setStoreEmpresaInfo(response.data);
                return true;
            })
            .catch((error) => {
                this.error('Error al cargar la información de la empresa', 'Por favor, inténtelo de nuevo más tarde.');
                return false;
            });
    }

    async onLoadCatalogosInfo(): Promise<boolean> {
        const catalogosUrl = `${this.backendUrl}/catalogos/index`;
        const transactionId = v4();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId,
        });

        return this.http
            .get<any>(catalogosUrl, { headers })
            .toPromise()
            .then((response) => {
                this.setStoreCatalogoInfo(response.data[0].catalogos_agrupados);
                return true;
            })
            .catch((error) => {
                this.error('Error al cargar la información de la empresa', 'Por favor, inténtelo de nuevo más tarde.');
                return false;
            });
    }

    async onLoadActEconomicaInfo(): Promise<boolean> {
        const catalogosUrl = `${this.backendUrl}/catalogos/act-economica`;
        const transactionId = v4();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-transaction-id': transactionId,
        });

        return this.http
            .get<any>(catalogosUrl, { headers })
            .toPromise()
            .then((response) => {
                this.setStoreActEconomicaInfo(response.data);
                return true;
            })
            .catch((error) => {
                this.error('Error al cargar la información de la empresa', 'Por favor, inténtelo de nuevo más tarde.');
                return false;
            });
    }

    success(title: string, text?: string, timer: number = 2000): void {
        Swal.fire({
            icon: 'success',
            title,
            text,
            timer,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: { popup: 'sweet-alerts' },
        });
    }

    error(title: string, text?: string): void {
        Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonText: 'Aceptar',
            customClass: { popup: 'sweet-alerts' },
        });
    }

    info(title: string, text?: string): void {
        Swal.fire({
            icon: 'info',
            title,
            text,
            confirmButtonText: 'OK',
            customClass: { popup: 'sweet-alerts' },
        });
    }

    warning(title: string, text?: string): void {
        Swal.fire({
            icon: 'warning',
            title,
            text,
            confirmButtonText: 'Entendido',
            customClass: { popup: 'sweet-alerts' },
        });
    }

    confirm(
        title: string,
        text: string,
        onConfirm: () => void,
        onCancel?: () => void,
        confirmButtonText: string = 'Sí, continuar',
        cancelButtonText: string = 'Cancelar',
    ): void {
        Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            customClass: { popup: 'sweet-alerts' },
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            } else if (onCancel) {
                onCancel();
            }
        });
    }

    loading(title: string = 'Cargando...'): void {
        Swal.fire({
            title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
            customClass: { popup: 'sweet-alerts' },
        });
    }

    close(): void {
        Swal.close();
    }

    toast(icon: SweetAlertIcon, message: string): void {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        toast.fire({
            icon,
            title: message,
            customClass: { popup: 'sweet-alerts' },
        });
    }

    setStoreFacturacionConfig(sucursalIdSelected: string, codActEcoSelected: string): void {
        localStorage.setItem('codActEcoSelected', codActEcoSelected);
        localStorage.setItem('sucursalIdSelected', sucursalIdSelected);
    }
    async getStoreFacturacionConfig(): Promise<{ sucursalIdSelected: string; codActEcoSelected: string }> {
        const sucursalIdSelected = localStorage.getItem('sucursalIdSelected') || '';
        const codActEcoSelected = localStorage.getItem('codActEcoSelected') || '';
        return { sucursalIdSelected, codActEcoSelected };
    }

    setStoreEmpresaInfo(empresaInfo: EmpresaInfoStore): void {
        localStorage.setItem('empresa_info', JSON.stringify(empresaInfo));
    }

    async getStoreEmpresaInfo(): Promise<EmpresaInfoStore | null> {
        const raw = localStorage.getItem('empresa_info');
        return raw ? (JSON.parse(raw) as EmpresaInfoStore) : null;
    }

    setStoreCatalogoInfo(catalogoInfo: CatalogosAgrupados): void {
        localStorage.setItem('catalogo_info', JSON.stringify(catalogoInfo));
    }

    async getStoreCatalogoInfo(): Promise<CatalogosAgrupados | null> {
        const raw = localStorage.getItem('catalogo_info');
        return raw ? (JSON.parse(raw) as CatalogosAgrupados) : null;
    }

    setStoreActEconomicaInfo(actEconnomica: ActEconomicaItem[]): void {
        localStorage.setItem('act-econnomica', JSON.stringify(actEconnomica));
    }

    async getStoreActEconomicaInfo(): Promise< ActEconomicaItem[] | null> {
        const raw = localStorage.getItem('act-econnomica');
        return raw ? (JSON.parse(raw) as ActEconomicaItem[]) : null;
    }
}
