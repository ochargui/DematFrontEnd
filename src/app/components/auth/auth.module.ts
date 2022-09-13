import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SendResetEmailComponent } from './send-reset-email/send-reset-email.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

//Primeng
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// reCaptcha
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AuthComponent,
    NewPasswordComponent,
    LoginComponent,
    SendResetEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PasswordModule,
    DividerModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    RecaptchaModule
  ],
})
export class AuthModule {}
