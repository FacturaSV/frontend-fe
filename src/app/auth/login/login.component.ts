import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { CommonModule } from '@angular/common';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, IconModule, FormsModule], // Asegura que el módulo de iconos está disponible
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    animations: [toggleAnimation],
})
export class LoginComponent {
    store: any;
    username: string = '';
    password: string = '';
    currYear: number = new Date().getFullYear();
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private appSetting: AppService,
        private alert: AlertService,
    ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }

    async login() {
        const success = await this.authService.login(this.username, this.password);
        if (success) {
            this.alert.success('Inicio de sesión exitoso', 'Bienvenido a la plataforma');
            this.alert.onLoadEmpresaInfo();
            this.alert.onLoadCatalogosInfo()
            this.alert.onLoadActEconomicaInfo()
            this.router.navigate(['']);
        } else {
            this.alert.error('Error de autenticación', 'Usuario o contraseña incorrectos');
        }
    }
}
