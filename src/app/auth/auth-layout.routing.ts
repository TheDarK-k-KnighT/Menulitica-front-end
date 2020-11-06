import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',      component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'resetpassword/:id', component: ResetPasswordComponent },

];
