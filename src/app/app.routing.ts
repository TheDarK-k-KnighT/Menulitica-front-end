import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AuthGuard } from './services/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
   }],
},
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: '', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
//   { path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(mod => mod.AdminLayoutModule),
//     canActivate: [AuthGuard]
//   },
//   {
//     path: '**',
//     redirectTo: 'dashboard'
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
