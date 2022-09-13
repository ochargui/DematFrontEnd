import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdministrationComponent } from './administration/administration.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ManualTypingComponent } from './operator/typing/manual-typing/manual-typing.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { DocumentSkeletonComponent } from './layout/loaders/skeletons/document-skeleton/document-skeleton.component';

///Primeng
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DocumentTrafficComponent } from './home/charts/document-traffic/document-traffic.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DocumentValidityChartComponent } from './home/charts/document-validity-chart/document-validity-chart.component';
import { DocumentValidChartComponent } from './home/charts/document-valid-chart/document-valid-chart.component';
import { DocumentNovalidChartComponent } from './home/charts/document-novalid-chart/document-novalid-chart.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ListboxModule } from 'primeng/listbox';

import { DigitalizingComponent } from './operator/digitalizing/digitalizing.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProgressBarModule } from 'primeng/progressbar';
import { DocumentPictureComponent } from './operator/typing/document-picture/document-picture.component';
import { ImageModule } from 'primeng/image';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ControlDocumentSkeletonComponent } from './layout/loaders/skeletons/control-document-skeleton/control-document-skeleton.component';
import { ControlDocumentPictureComponent } from './operator/control/control-document-picture/control-document-picture.component';
import { CheckFormComponent } from './operator/control/document-forms/check-form/check-form.component';
import { PonderationComponent } from './admin/ponderation/ponderation.component';
import { AgentChartsComponent } from './home/charts/agent-charts/agent-charts.component';
import {DropdownModule} from 'primeng/dropdown';
import { ControlDocumentsComponent } from './operator/control/control-documents/control-documents.component';
import { ControlMenuComponent } from './operator/control/control-menu/control-menu.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    SearchComponent,
    AdministrationComponent,
    NavBarComponent,
    SideBarComponent,
    HeaderComponent,
    DocumentTrafficComponent,
    DocumentValidityChartComponent,
    DocumentValidChartComponent,
    DocumentNovalidChartComponent,
    ManualTypingComponent,
    DocumentSkeletonComponent,
    ControlDocumentsComponent,
    ControlMenuComponent,
    DigitalizingComponent,
    DocumentPictureComponent,
    ControlDocumentSkeletonComponent,
    ControlDocumentPictureComponent,
    CheckFormComponent,
    PonderationComponent,
    AgentChartsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    BreadcrumbModule,
    CalendarModule,
    DividerModule,
    InputTextModule,
    NgApexchartsModule,
    CascadeSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
    DialogModule,
    TableModule,
    ToolbarModule,
    ProgressSpinnerModule,
    PasswordModule,
    NgxIntlTelInputModule,
    ListboxModule,
    FileUploadModule,
    ProgressBarModule,
    TableModule,
    ImageModule,
    AccordionModule,
    InputNumberModule,
    CheckboxModule,
    InputTextareaModule,
    ToolbarModule,
    ProgressSpinnerModule,
    ListboxModule,
    DropdownModule,
    SplitButtonModule,
    MultiSelectModule,
  ],
})
export class ClientModule {}
