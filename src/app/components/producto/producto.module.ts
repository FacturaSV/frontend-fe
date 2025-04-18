import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProducListComponent } from './produc-list/produc-list.component';
import { ProducFormComponent } from './produc-form/produc-form.component';
import { SharedModule } from 'src/shared.module';
import { IconModule } from 'src/app/shared/icon/icon.module';

@NgModule({
    declarations: [ProducListComponent, ProducFormComponent],
    exports: [IconModule],
    imports: [ProductoRoutingModule, CommonModule, SharedModule.forRoot()],
})
export class ProductoModule {}
