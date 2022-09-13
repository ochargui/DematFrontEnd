import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/SinIn',
        pathMatch: 'full',
      },
      {
        path: 'SinIn',
        loadChildren: () =>
          import('./components/auth/auth.module').then(
            (module) => module.AuthModule
          ),
      },
    ],
  },
  {
    path: 'client',
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/client/client.module').then(
        (module) => module.ClientModule
      ),
  },
  { path: '**', redirectTo: '/client' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
