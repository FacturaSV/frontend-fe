import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { AlertService } from 'src/app/shared/alert.service';
import { slideDownUp } from 'src/app/shared/animations';

@Component({
    selector: 'app-catg-list',
    standalone: false,
    templateUrl: './catg-list.component.html',
    styleUrl: './catg-list.component.css',
    animations: [slideDownUp],
})
export class CatgListComponent implements OnInit {
    categoriasArbol: any[] = [];
    toggleAllExpanded = false;
    constructor(
        private service: CategoriaService,
        private alert: AlertService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.service.getCategorias(1).subscribe((res: any) => {
            this.categoriasArbol = res;
        });
    }
    treeview1: any = ['images', 'html'];

    toggleTreeview1(name: string) {
        if (this.treeview1.includes(name)) {
            this.treeview1 = this.treeview1.filter((d: string) => d !== name);
        } else {
            this.treeview1.push(name);
        }
    }

    toggleAllTreeview(): void {
        if (this.toggleAllExpanded) {
            // Colapsar todas
            this.treeview1 = [];
        } else {
            // Expandir todas: recorrer todas las categorías y sus subcategorías recursivamente
            const ids: number[] = [];
            const collectIds = (categorias: any[]) => {
                for (const cat of categorias) {
                    ids.push(cat.id);
                    if (cat.subcategorias?.length > 0) {
                        collectIds(cat.subcategorias);
                    }
                }
            };
            collectIds(this.categoriasArbol);
            this.treeview1 = ids;
        }

        this.toggleAllExpanded = !this.toggleAllExpanded;
    }

    onNew(categoria: any): void {
        this.router.navigate(['categoria/new', categoria.nivel +1, categoria.id]);
    }

    onEdit(categoria: any) {
        this.router.navigate(['categoria/edit', categoria.id]);
    }

    onDelete(categoria: any): void {
        this.alert.confirm(
            '¿Eliminar cliente?',
            'Esta acción no se puede deshacer.',
            () => {
                // acción si confirma
                this.service.deleteCategoria(categoria.id).subscribe(
                    () => {
                        this.alert.success('Cliente eliminado', 'Ejecutado con éxito', 1000);
                        this.ngOnInit();
                    },
                    (error) => {
                        this.alert.error('Error al eliminar cliente', error.message);
                    },
                );
            },
            () => {
                // acción si cancela (opcional)
                console.log('Cancelado');
            },
        );
    }
}
