import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login';
import { VERIFICATIONLINK } from '../shared';
import { SignUpComponent } from './sign-up';
import { AboutUsComponent } from './about-us';
import { HowItWorksComponent } from './how-it-works';
import { ForgotPasswordComponent } from './forgot-password';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: `${VERIFICATIONLINK}/:id`, component: VerifyEmailComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent}
];
export const declarations: Array<any> = [
  HomeComponent,
  LoginComponent,
  SignUpComponent,
  VerifyEmailComponent,
  AboutUsComponent,
  HowItWorksComponent,
  ForgotPasswordComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
