import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './dashboard.route';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes), // Carga rutas del Dashboard
    ],
})
export class DashboardModule {}
