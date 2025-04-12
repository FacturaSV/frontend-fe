import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
    selector: 'app-cli-list',
    templateUrl: './cli-list.component.html',
    styleUrl: './cli-list.component.css',
})
export class CliListComponent implements OnInit {
    cols = [
        // { field: 'id', title: 'ID', type: 'number', isUnique: true },
        { field: 'numDocumento', title: 'Número Documento' },
        { field: 'nrc', title: 'NRC' },
        { field: 'nombre', title: 'Nombre' },
        { field: 'email', title: 'Correo electrónico' },
        { field: 'telefono', title: 'Teléfono' },
        // { field: 'tipoDocumento', title: 'Tipo Documento' },
        { field: 'direccion', title: 'Dirección' },
        // { field: 'departamento.valor', title: 'Departamento' },
        // { field: 'municipio.valor', title: 'Municipio' },
        { field: 'actividadCodigo', title: 'Cód. Actividad', html: true },
        { field: 'actions', title: 'Acciones' },

        // { field: 'actividadValor', title: 'Actividad Económica', html: true },
        // { field: 'municipioId', title: 'Municipio ID', type: 'number' },
        // { field: 'departamentoId', title: 'Departamento ID', type: 'number' },
        // { field: 'estadoRt', title: 'Estado', type: 'text' },
        // { field: 'createdAt', title: 'Creado', type: 'date' },
        // { field: 'updatedAt', title: 'Actualizado', type: 'date' },
    ];

    loading = true;
    rows: any[] = [];
    page = 1;
    pageSize = 30;
    totalRows = 0;
    totalPages = 0;
    filtrosTabla: any[] = [];
    empresaId = 1; // o podrías obtenerlo dinámicamente

    constructor(
        private clienteService: ClienteService,
        private alert: AlertService,
    ) {}
    ngOnInit(): void {
        this.cargarClientes();
    }

    cargarClientes() {
        const filtros = this.mapearFiltrosDesdeNgTable(this.filtrosTabla);
        this.clienteService.buscarClientesPorEmpresa(filtros, this.empresaId, this.page, this.pageSize).subscribe((res) => {
            this.rows = res.data.data;
            this.totalRows = res.data.total;
            this.pageSize = res.data.limit;
            this.totalPages = res.data.totalPages;
            this.loading = false;
        });
    }

    onFiltroTablaChange(filtrosTabla: any[]) {
        this.filtrosTabla = filtrosTabla;
        this.page = 1;
        this.cargarClientes();
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
            .filter((col: any) => col.value !== undefined && col.value !== null && col.value !== '')
            .map((col: any) => {
                const operadorBackend = operadorMapeo[col.condition] || 'LIKE'; // fallback por si falta uno
                return {
                    columna: col.field,
                    operador: operadorBackend,
                    valor: col.value,
                };
            });

        return { OR };
    }

    onServerChange(event: any) {
        this.loading = true;
        this.page = event.current_page;
        this.pageSize = event.pagesize;

        this.filtrosTabla = event.column_filters;

        this.cargarClientes();
    }

    onView(user: any) {
        alert('View onView \n' + user.id + ', ' + user.firstName + ', ' + user.lastName + ', ' + user.email);
    }
    onEdit(user: any) {
        alert('View onEdit \n' + user.id + ', ' + user.firstName + ', ' + user.lastName + ', ' + user.email);
    }
    onDelete(user: any) {
        this.alert.confirm(
            '¿Eliminar cliente?',
            'Esta acción no se puede deshacer.',
            () => {
                // acción si confirma
                // this.eliminarCliente();
            },
            () => {
                // acción si cancela (opcional)
                console.log('Cancelado');
            },
        );
    }
}
