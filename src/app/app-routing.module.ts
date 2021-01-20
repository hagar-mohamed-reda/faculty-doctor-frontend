import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout.component';
import { AuthGuardService } from './shared/middlewares/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './core/components/main-page/main-page.component';
import { CourseIndexComponent } from './components/course/course-index/course-index.component';
import { LectureIndexComponent } from './components/lecture-index/lecture-index.component';
import { LectureShowComponent } from './components/lecture-show/lecture-show.component';
import { LectureCreateComponent } from './components/lecture-create/lecture-create.component';
import { AssigmentIndexComponent } from './components/assigment-index/assigment-index.component';
import { QuestionIndexComponent } from './components/question/question-index/question-index.component';
import { QuestionCategoryIndexComponent } from './components/question-category/question-category-index/question-category-index.component';
import { ExamIndexComponent } from './components/exam/exam-index/exam-index.component';
import { ExamFormComponent } from './components/exam/exam-form/exam-form.component';
import { CorrectBlanAnswerComponent } from './components/exam/correct-blan-answer/correct-blan-answer.component';
import { AssignStudentToExamComponent } from './components/exam/assign-student-to-exam/assign-student-to-exam.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'courses',
        component: CourseIndexComponent
      },
      {
        path: 'lectures/:id',
        component: LectureIndexComponent
      },
      {
        path: 'show-lecture',
        component: LectureShowComponent
      },
      {
        path: 'create-lecture',
        component: LectureCreateComponent
      },
      {
        path: 'assigments',
        component: AssigmentIndexComponent
      },
      {
        path: 'question-categorys',
        component: QuestionCategoryIndexComponent
      },
      {
        path: 'questions',
        component: QuestionIndexComponent
      },
      {
        path: 'exams',
        component: ExamIndexComponent
      },
      {
        path: 'create-exam',
        component: ExamFormComponent
      },
      {
        path: 'edit-exam',
        component: ExamFormComponent
      },
      {
        path: 'correct-blank',
        component: CorrectBlanAnswerComponent
      },
      {
        path: 'assign-exam',
        component: AssignStudentToExamComponent
      },
      {
        path: 'main',
        component: MainPageComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
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
