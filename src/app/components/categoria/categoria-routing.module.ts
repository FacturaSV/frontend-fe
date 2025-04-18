import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatgListComponent } from './catg-list/catg-list.component';
import { CatgFormComponent } from './catg-form/catg-form.component';

export const routes: Routes = [
    { path: 'list', component: CatgListComponent },
    { path: 'edit/:id', component: CatgFormComponent },
    { path: 'new/:nivel/:id', component: CatgFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class CategoriaRoutingModule {}
