import { Component } from '@angular/core';
import { Empresa, EmpresaService } from '../../../service/empresa.service';

@Component({
    selector: 'app-fact-list',
    standalone: true,
    imports: [],
    templateUrl: './fact-list.component.html',
    styleUrl: './fact-list.component.css',
})
export class FactListComponent {
    empresa?: Empresa;

    constructor(private empresaService: EmpresaService) {
        this.cargarInfoEmpresa();
    }


    cargarInfoEmpresa() {
        this.empresaService.getEmpresaByGroup("token").subscribe((empresa: Empresa) => {
            this.empresa = empresa;
        });
    }


}
