import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatPaginatorModule, MatSlideToggleModule, MatSortModule, MatTableModule } from '../../../node_modules/@angular/material';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { RoleIndexComponent } from './components/role/role-index/role-index.component';
import { RoleFormComponent } from './components/role/role-form/role-form.component';
import { PermissionComponent } from './components/role/permission/permission.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
@NgModule({
  declarations: [
    UserComponent,
    UserIndexComponent,
    UserFormComponent,
    RoleIndexComponent,
    RoleFormComponent,
    PermissionComponent,
    UserHistoryComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ]
})
export class UserModule {
  constructor() {
    }

}
