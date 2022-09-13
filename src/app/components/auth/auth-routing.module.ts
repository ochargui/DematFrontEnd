import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from './auth.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SendResetEmailComponent } from './send-reset-email/send-reset-email.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'reset-password', component: NewPasswordComponent },
      { path: 'send-reset-email', component: SendResetEmailComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
