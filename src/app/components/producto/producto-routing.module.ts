import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducListComponent } from './produc-list/produc-list.component';
import { ProducFormComponent } from './produc-form/produc-form.component';

export const routes: Routes = [
    { path: 'list', component: ProducListComponent },
    { path: 'edit/:id', component: ProducFormComponent },
    { path: 'new', component: ProducFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ProductoRoutingModule {}
