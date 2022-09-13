import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdministrationComponent } from './administration/administration.component';
import { ManualTypingComponent } from './operator/typing/manual-typing/manual-typing.component';
import { ControlMenuComponent } from './operator/control/control-menu/control-menu.component';
import { DigitalizingComponent } from './operator/digitalizing/digitalizing.component';
import { ControlDocumentsComponent } from './operator/control/control-documents/control-documents.component';
import { PonderationComponent } from './admin/ponderation/ponderation.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: { breadcrumb: { breadcrumb: 'Accueil' } },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { breadcrumb: { skip: true } },
      },
      {
        path: 'search',
        component: SearchComponent,
        data: { breadcrumb: 'Recherche' },
      },
      {
        path: 'administration',
        component: AdministrationComponent,
        data: { breadcrumb: 'Administration' },
      },
      {
        path: 'operator/typing',
        component: ManualTypingComponent,
        data: { breadcrumb: ' Typage' },
      },
      {
        path: 'operator/control',
        component: ControlMenuComponent,
        data: { breadcrumb: ' Contrôle' },
      },
      {
        path: 'operator/control/document',
        component: ControlDocumentsComponent,
        data: { breadcrumb: ' Contrôle' },
      },
      {
        path: 'operator/digitalizing',
        component: DigitalizingComponent,
        data: { breadcrumb: 'Scannage' },
      },
      {
        path: 'ponderation',
        component: PonderationComponent,
        data: { breadcrumb: 'Pondération' },
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: { breadcrumb: 'Accueil' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
