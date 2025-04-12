import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactListComponent } from './fact-list/fact-list.component';
import { FactNewComponent } from './fact-new/fact-new.component';

export const routes: Routes = [
    { path: 'lista', component: FactListComponent }, // Ruta raíz del dashboard
    { path: 'FE/nueva', component: FactNewComponent }, // /facturacion/FE/nueva, /facturacion/CCFE/nueva, etc.

    // { path: ':documento/nueva', component: FactNewComponent }, // /facturacion/FE/nueva, /facturacion/CCFE/nueva, etc.
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class FacturaRoutingModule {}
