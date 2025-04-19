import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalService, TIPOS_ESTABLECIMIENTO } from 'src/app/service/sucursal.service';
import { AlertService, CatalogoItem } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-suc-form',
  templateUrl: './suc-form.component.html',
  styleUrl: './suc-form.component.css'
})
export class SucFormComponent implements OnInit {
    form!: FormGroup;
    isEditMode = false;
    sucursalId!: number;

    cat012: CatalogoItem[] = [];
    cat013: CatalogoItem[] = [];

    tiposEstablecimiento = TIPOS_ESTABLECIMIENTO;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sucursalService: SucursalService,
        private alert: AlertService,
    ) {}

    async ngOnInit() {
        const params = this.route.snapshot.paramMap;
        const id = params.get('id');

        if (id) {
            this.isEditMode = true;
            this.sucursalId = +id;
            this.loadSucursal(+id);
        }

        this.initForm();

        const catalogos = await this.alert.getStoreCatalogoInfo();
        this.cat012 = catalogos?.['CAT-012'] ?? [];
        this.cat013 = catalogos?.['CAT-013'] ?? [];
    }

    initForm() {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.email]],
            telefono: [''],
            tipoEstablecimiento: ['', Validators.required],
            direccion: [''],
            departamentoId: [null],
            municipioId: [null],
            codPuntoVenta: [''],
            codPuntoVentaMH: [''],
            codigoDte: [''],
            codEstable: [''],
            codEstableMH: [''],
        });

    }

    loadSucursal(id: number) {
        this.sucursalService.getSucursalById(id).subscribe((res) => {
            this.form.patchValue(res);
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        const data = this.form.value;

        if (this.isEditMode) {
            this.sucursalService.updateSucursal(this.sucursalId, data).subscribe(() => {
                this.alert.success('Sucursal actualizada', 'Operación exitosa');
            });
        } else {
            this.sucursalService.createSucursal(data).subscribe(() => {
                this.alert.success('Sucursal creada', 'Operación exitosa');
            });
        }
    }

    validateField(field: string): string {
        const control = this.form.get(field);
        return control?.touched && control.invalid
            ? 'has-error'
            : control?.touched
            ? 'has-success'
            : '';
    }

    hasError(field: string, error: string): boolean {
        return this.form.get(field)?.hasError(error) ?? false;
    }
}
