import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { Sucursal, SucursalService, TIPOS_ESTABLECIMIENTO } from 'src/app/service/sucursal.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
    selector: 'app-suc-list',
    standalone: false,
    templateUrl: './suc-list.component.html',
    styleUrl: './suc-list.component.css',
})
export class SucListComponent implements OnInit {
    cols = [
        { field: 'codigoDte', title: 'Código DTE' },
        { field: 'nombre', title: 'Nombre' },
        { field: 'email', title: 'Correo electrónico' },
        { field: 'telefono', title: 'Teléfono' },
        { field: 'direccion', title: 'Dirección' },
        { field: 'tipoEstablecimiento', title: 'Tipo Establecimiento' },
        // { field: 'estadoRt', title: 'Estado' },
        { field: 'actions', title: 'Acciones' },
    ];
    tiposEstablecimiento = TIPOS_ESTABLECIMIENTO;

    loading = true;
    rows: Sucursal[] = [];
    page = 1;
    pageSize = 10;
    totalRows = 0;
    totalPages = 0;
    filtrosTabla: any[] = [];
    tenantCode = '1'; // Puede venir de empresa seleccionada
    schema = 'default_schema';
    transactionId = 'SUC_LIST_' + new Date().getTime();

    constructor(
        private sucursalService: SucursalService,
        private router: Router,
        private alert: AlertService,
    ) {}

    ngOnInit(): void {
        this.cargarSucursales();
    }

    cargarSucursales() {
        const filtros = this.mapearFiltrosDesdeNgTable(this.filtrosTabla);

        this.sucursalService.buscarSucursales(filtros, this.transactionId, this.schema, this.page, this.pageSize).subscribe({
            next: (res) => {
                console.log('Sucursales cargadas:', res);

                this.rows = res.data;
                this.totalRows = res.total;
                this.totalPages = res.totalPages;
                this.page = res.page;
                this.pageSize = res.limit;

                this.loading = false;
            },
            error: (err) => {
                this.alert.error('Error al cargar sucursales', err.message);
                this.loading = false;
            },
        });
    }

    onFiltroTablaChange(filtrosTabla: any[]) {
        this.filtrosTabla = filtrosTabla;
        this.page = 1;
        this.cargarSucursales();
    }

    mapearFiltrosDesdeNgTable(columnas: any[]): { AND?: any[]; OR?: any[] } {
        const operadorMapeo: Record<string, string> = {
            contain: 'LIKE',
            equals: '=',
            not: '!=',
            gt: '>',
            gte: '>=',
            lt: '<',
            lte: '<=',
        };

        const OR = columnas
            .filter((col) => col.value !== undefined && col.value !== null && col.value !== '')
            .map((col) => ({
                columna: col.field,
                operador: operadorMapeo[col.condition] || 'LIKE',
                valor: col.value,
            }));

        return { OR };
    }

    onServerChange(event: any) {
        this.loading = true;
        this.page = event.current_page;
        this.pageSize = event.pagesize;
        this.filtrosTabla = event.column_filters;
        this.cargarSucursales();
    }

    onView(row: Sucursal) {
        this.alert.info('Sucursal seleccionada', `ID: ${row.id}`);
    }

    onEdit(row: Sucursal) {
        this.router.navigate(['sucursal/edit', row.id]);
    }

    onDelete(row: Sucursal) {
        this.alert.confirm('¿Eliminar sucursal?', 'Esta acción no se puede deshacer.', () => {
            this.sucursalService.deleteSucursal(row.id!).subscribe(
                () => {
                    this.alert.success('Sucursal eliminada', 'Operación exitosa');
                    this.cargarSucursales();
                },
                (error) => {
                    this.alert.error('Error al eliminar sucursal', error.message);
                },
            );
        });
    }

    getTipoEstablecimientoNombre(codigo: string): string {
        return this.tiposEstablecimiento.find(t => t.codigo === codigo)?.valor || 'Desconocido';
    }

}
