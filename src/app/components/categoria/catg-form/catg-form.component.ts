import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoriaService } from 'src/app/service/categoria.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
    selector: 'app-catg-form',
    standalone: false,
    templateUrl: './catg-form.component.html',
    styleUrl: './catg-form.component.css',
})
export class CatgFormComponent implements OnInit {
    form!: FormGroup;
    isEditMode = false;
    categoriaId!: number;

    categoriasPadre: any[] = [];

    niveles = [
        {
            id: 1,
            nombre: 'Categoria',
        },
        {
            id: 2,
            nombre: 'Subcategoria',
        },
        {
            id: 3,
            nombre: 'Subsubcategoria',
        },
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        public storeData: Store<any>,
        private service: CategoriaService,
        private alert: AlertService,
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            nivel: [null, Validators.required],
            categoriaPadreId: [null],
            nombre: ['', Validators.required],
            descripcion: [''],
        });

        this.form.get('nivel')?.valueChanges.subscribe((nivel: number) => {
            if (nivel === 2 || nivel === 3) {
                this.form.get('categoriaPadreId')?.setValidators([Validators.required]);
                this.onLoadNivel(nivel - 1); // Carga las categorías padre del nivel anterior
            } else {
                this.form.get('categoriaPadreId')?.clearValidators();
                this.form.get('categoriaPadreId')?.setValue(null);
            }

            this.form.get('categoriaPadreId')?.updateValueAndValidity();
        });
        this.route.paramMap.subscribe((params) => {
            const nivel = params.get('nivel');
            const id = params.get('id');

            if (nivel && id) {
                this.isEditMode = false;
                this.onLoadNivel(+nivel);
                this.form.get('nivel')?.setValue(+nivel);
                this.form.get('categoriaPadreId')?.setValue(+id);
            } else if (id && !nivel) {
                this.isEditMode = true;
                this.categoriaId = +id;
                this.loadCategoria(+id);
            }
        });
    }

    onLoadNivel(nivel: number) {
        this.service.getCategoriasNivel(nivel).subscribe((res) => {
            this.categoriasPadre = res;
        });
    }

    loadCategoria(id: number) {
        this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
        this.service.getCategoriaById(id).subscribe((res) => {
            const cat = res;
            this.form.patchValue({
                nivel: cat.nivel,
                categoriaPadreId: cat.categoriaPadreId,
                nombre: cat.nombre,
                descripcion: cat.descripcion,
            });
            this.onLoadNivel((cat.nivel as number) - 1);
            this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        const data = this.form.value;

        if (this.isEditMode) {
            this.service.updateCategoria(this.categoriaId, data).subscribe(() => {
                this.alert.success('Acción actualizar categoría', 'Ejecutado con éxito', 1000);
            });
        } else {
            this.service.createCategoria(data).subscribe(() => {
                this.alert.success('Acción crear categoría', 'Ejecutado con éxito', 1000);
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
