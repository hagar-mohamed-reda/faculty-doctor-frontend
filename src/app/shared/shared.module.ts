import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MainLoaderComponent } from './components/main-loader/main-loader.component';
import { ConfirmTemplateDirective} from './services/confirm.service';
import { TablesLoaderDirective } from './directives/tables-loader.directive';
import { NoMatchingComponent } from './components/no-matching/app-no-matching.component';
import { ButtonClickedDirective } from './directives/button-clicked-directive.directive';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReplaceUnderscoreWithSpacePipe } from './pipes/replace-underscore-with-space.pipe';
import { TransPipe } from './pipes/trans.pipe';
import { DataTablesModule } from 'angular-datatables';
import { PermissionDirective } from './directives/permission.directive';
import { ImportExcelComponent } from './components/import-excel/import-excel.component';
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatSliderModule, MatSlideToggleModule, MatSortModule, MatTableModule } from '@angular/material';
import { ExportExcelComponent } from './components/export-excel/export-excel.component';
import { AppAvatarComponent } from './components/app-avatar/app-avatar.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ConfirmTemplateDirective,
    ConfirmModalComponent,
    TablesLoaderDirective,
    LoadMoreComponent,
    ReplaceUnderscoreWithSpacePipe,
    NoMatchingComponent,
    ButtonClickedDirective,
    MainLoaderComponent,
    TransPipe,
    PermissionDirective,
    ImportExcelComponent,
    ExportExcelComponent,
    AppAvatarComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgbModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    NoMatchingComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonClickedDirective,
    LoadMoreComponent,
    NgbModule,
    Ng2FlatpickrModule,
    TablesLoaderDirective,
    RouterModule,
    BreadcrumbComponent,
    ConfirmTemplateDirective,
    ConfirmModalComponent,
    MainLoaderComponent,
    ReplaceUnderscoreWithSpacePipe,
    TransPipe,
    PermissionDirective,
    ImportExcelComponent,
    ExportExcelComponent,
    AppAvatarComponent
  ]
})
export class SharedModule { }
