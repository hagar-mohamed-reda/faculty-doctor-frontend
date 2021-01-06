import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout.component';
import { AuthGuardService } from './shared/middlewares/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StudentIndexComponent } from './components/student/student-index/student-index.component';
import { DoctorIndexComponent } from './components/doctor/doctor-index/doctor-index.component';
import { CourseIndexComponent } from './components/course/course-index/course-index.component';
import { CourseShowComponent } from './components/course/course-show/course-show.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { MainPageComponent } from './core/components/main-page/main-page.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'students',
        component: StudentIndexComponent
      },
      {
        path: 'doctors',
        component: DoctorIndexComponent
      },
      {
        path: 'courses',
        component: CourseIndexComponent
      },
      {
        path: 'main',
        component: MainPageComponent
      },
      {
        path: 'courses/:id',
        component: CourseShowComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'users',
        component: UserIndexComponent
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingModule'
      },
     /* {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'admin-users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule'
      },
      {
        path: 'app-users',
        loadChildren: './app-users/app-users.module#AppUsersModule'
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        // redirectTo: 'dashboard',
        pathMatch: 'full'
      }*/
    ]
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    // redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        scrollPositionRestoration: 'enabled'
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
