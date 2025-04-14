import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActEconomicaItem, CatalogoItem } from './../../../shared/alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { AlertService, CatalogosAgrupados } from 'src/app/shared/alert.service';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-cli-form',
    templateUrl: './cli-form.component.html',
    styleUrl: './cli-form.component.css',
})
export class CliFormComponent implements OnInit {
    clienteId!: number;
    cliente: any = {};
    cat012: CatalogoItem[] = [];
    cat013: CatalogoItem[] = [];
    actEconomica: ActEconomicaItem[] = [];
    selectedActividadIds: number[] = [];
    tiposDocumentoReceptor = [
        { codigo: '13', valor: 'DUI', descripcion: 'Documento Único de Identidad (personas naturales en El Salvador)' },
        { codigo: '36', valor: 'NIT', descripcion: 'Número de Identificación Tributaria' },
        { codigo: '03', valor: 'Pasaporte', descripcion: 'Para extranjeros' },
        { codigo: '02', valor: 'Carnet de Residente', descripcion: 'Extranjeros con residencia' },
        { codigo: '37', valor: 'Otro', descripcion: 'Cualquier otro tipo de identificación' },
    ];

    form!: FormGroup;
    isEditMode = false;
    isSubmitForm3 = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public storeData: Store<any>,
        private clienteService: ClienteService,
        private alert: AlertService,
    ) {}

    async ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.clienteId = +id;
                this.loadCliente(+id);
                this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
            }
        });
        this.initForm();
        const catalogos = await this.alert.getStoreCatalogoInfo();
        this.cat012 = catalogos?.['CAT-012'] ?? [];
        this.cat013 = catalogos?.['CAT-013'] ?? [];

        const actEco = await this.alert.getStoreActEconomicaInfo();
        this.actEconomica = actEco ?? [];
    }

    initForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefono: [''],
            tipoDocumento: ['', Validators.required],
            numDocumento: ['', Validators.required],
            nrc: [''],
            direccion: [''],
            departamentoId: [null],
            municipioId: [null],
            ClienteActividadEconomica: [[]], // Array de ids
        });
    }

    loadCliente(id: number) {
        this.clienteService.buscarClientesById(id).subscribe((res) => {
            const cliente = res.data;
            this.form.patchValue({
                ...cliente,
                ClienteActividadEconomica: cliente.ClienteActividadEconomica?.map(
                  (a: any) => a.actividadEconomicaId
                ) ?? [],
              });
            this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        const formValue = this.form.value;

        const data = {
            ...formValue,
            ClienteActividadEconomica: Array.isArray(formValue.ClienteActividadEconomica)
                ? formValue.ClienteActividadEconomica.map((id: number) => ({
                      actividadEconomicaId: id,
                  }))
                : [],
        };

        if (this.isEditMode) {
            // update
            this.clienteService.updateCliente(this.clienteId, data).subscribe(() => {
                this.alert.success('Accion actualizar cliente', 'Ejecutado con éxito', 1000);
            });
        } else {
            // create
            this.clienteService.createCliente(data).subscribe(() => {
                this.alert.success('Accion crear cliente', 'Ejecutado con éxito', 1000);
            });
        }
    }

    validateField(field: string) {
        const control = this.form.get(field);
        return control?.touched && control.invalid ? 'has-error' : control?.touched ? 'has-success' : '';
    }

    hasError(field: string, error: string): boolean {
        return this.form.get(field)?.hasError(error) ?? false;
    }
}
