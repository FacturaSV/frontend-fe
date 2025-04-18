import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliListComponent } from './cli-list/cli-list.component';
import { CliFormComponent } from './cli-form/cli-form.component';

export const routes: Routes = [
    { path: 'list', component: CliListComponent },
    { path: 'edit/:id', component: CliFormComponent },
    { path: 'new', component: CliFormComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
