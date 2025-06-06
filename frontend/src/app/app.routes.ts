import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'movimientos', loadComponent: () => import('./pages/movimientos/movimientos.component').then(m => m.MovimientosComponent), canActivate: [AuthGuard] },
  { path: 'categorias', loadComponent: () => import('./pages/categorias/categorias.component').then(m => m.CategoriasComponent), canActivate: [AuthGuard] },
  { path: 'reportes', loadComponent: () => import('./pages/reportes/reportes.component').then(m => m.ReportesComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
