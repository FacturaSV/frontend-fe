import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AuthLayout } from './layouts/auth-layout';
import { AppLayout } from './layouts/app-layout';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/auth.login.guard';
import { ClienteModule } from './components/cliente/cliente.module';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard], // Protegido con AuthGuard
        children: [
            {
                path: '',
                component: IndexComponent,
                data: { title: 'Sales Admin' },
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
                data: { title: 'Dashboard' }, // ✅ Agregar `title`
            },
            {
                path: 'facturacion',
                loadChildren: () => import('./components/factura/factura.module').then((m) => m.FacturaModule),
                data: { title: 'Facturacion' }, // ✅ Agregar `title`
                // canActivate: [AuthGuard], // Protegido con AuthGuard
            },            {
                path: 'cliente',
                loadChildren: () => import('./components/cliente/cliente.module').then((m) => m.ClienteModule),
                data: { title: 'Clientes' }, // ✅ Agregar `title`
                // canActivate: [AuthGuard], // Protegido con AuthGuard
            },
        ],
    },
    {
        path: 'auth',
        component: AuthLayout,
        canActivate: [AuthLoginGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/auth/login', // Si no está autenticado, redirigir a login
    },
];
