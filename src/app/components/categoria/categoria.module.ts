import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { CatgFormComponent } from './catg-form/catg-form.component';
import { CatgListComponent } from './catg-list/catg-list.component';

@NgModule({
    declarations: [CatgFormComponent, CatgListComponent],
    exports: [IconModule],
    imports: [CategoriaRoutingModule, CommonModule, SharedModule.forRoot()],
})
export class CategoriaModule {}
