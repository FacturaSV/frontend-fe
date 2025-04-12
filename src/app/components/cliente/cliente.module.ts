import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { ClientRoutingModule } from './cliente-routing.module';
import { SharedModule } from 'src/shared.module';
import { CliListComponent } from './cli-list/cli-list.component';
import { CliFormComponent } from './cli-form/cli-form.component';

@NgModule({
    declarations: [CliListComponent, CliFormComponent],
    exports: [IconModule],
    imports: [ClientRoutingModule, CommonModule, SharedModule.forRoot()],
})
export class ClienteModule {}
