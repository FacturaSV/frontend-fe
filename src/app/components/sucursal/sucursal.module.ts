import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { SucListComponent } from './suc-list/suc-list.component';
import { SucFormComponent } from './suc-form/suc-form.component';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { SharedModule } from 'src/shared.module';


@NgModule({
    declarations: [SucListComponent, SucFormComponent],
    exports: [IconModule],
    imports: [SucursalRoutingModule, CommonModule, SharedModule.forRoot()],
})
export class SucursalModule { }
