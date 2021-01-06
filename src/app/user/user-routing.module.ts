import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';
import { RoleIndexComponent } from './components/role/role-index/role-index.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: 'u',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('user_read')},
        component: UserIndexComponent
      },
      {
        path: 'role',
        canActivate: [AuthGuestService],
        data: {can: Auth.can('role_read')},
        component: RoleIndexComponent
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
