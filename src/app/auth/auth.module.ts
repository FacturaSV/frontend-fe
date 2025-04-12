import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IconModule } from '../shared/icon/icon.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes), CommonModule, IconModule,FormsModule, LoginComponent, RegisterComponent],
})
export class AuthModule {}



