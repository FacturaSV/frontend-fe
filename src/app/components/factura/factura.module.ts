import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FactNewComponent } from './fact-new/fact-new.component';

@NgModule({
    declarations: [],
    exports: [IconModule],
    imports: [IconModule, CommonModule, FormsModule, ReactiveFormsModule, FormsModule, FacturaRoutingModule, FactNewComponent],
})
export class FacturaModule {}
