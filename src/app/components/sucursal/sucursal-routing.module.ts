import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucListComponent } from './suc-list/suc-list.component';
import { SucFormComponent } from './suc-form/suc-form.component';

export const routes: Routes = [
    { path: 'list', component: SucListComponent },
    { path: 'edit/:id', component: SucFormComponent },
    { path: 'new', component: SucFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SucursalRoutingModule {}
