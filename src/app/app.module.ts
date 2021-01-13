import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './shared/interceptors';
import { SharedModule } from './shared/shared.module';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthService } from './shared/services/auth.service';
import { LayoutComponent } from './core/layout.component';
import { AppComponent } from './core/app.component';
import { AuthComponent } from './core/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TranslationService } from './shared/services/translation.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { DataTablesModule } from '../../node_modules/angular-datatables';
import { UserService } from './user/services/user.service';
import { RoleService } from './user/services/role.service';
import { MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { CourseIndexComponent } from './components/course/course-index/course-index.component';
import { LectureIndexComponent } from './components/lecture-index/lecture-index.component';
import { LectureFormComponent } from './components/lecture-form/lecture-form.component';
import { LectureShowComponent } from './components/lecture-show/lecture-show.component';
import { LectureCreateComponent } from './components/lecture-create/lecture-create.component';
import { AssigmentIndexComponent } from './components/assigment-index/assigment-index.component';
import { QuestionIndexComponent } from './components/question/question-index/question-index.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';
import { QuestionCreateMoreComponent } from './components/question/question-create-more/question-create-more.component';
import { QuestionCategoryIndexComponent } from './components/question-category/question-category-index/question-category-index.component';
import { QuestionCategoryFormComponent } from './components/question-category/question-category-form/question-category-form.component';
import { AssigmentReportComponent } from './components/report/assigment-report/assigment-report.component';
import { ExamFormComponent } from './components/exam/exam-form/exam-form.component';
import { ExamIndexComponent } from './components/exam/exam-index/exam-index.component';
import { CorrectBlanAnswerComponent } from './components/exam/correct-blan-answer/correct-blan-answer.component';
import { AssignStudentToExamComponent } from './components/exam/assign-student-to-exam/assign-student-to-exam.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AuthComponent,
    AppComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    CourseIndexComponent,
    LectureIndexComponent,
    LectureFormComponent,
    LectureShowComponent,
    LectureCreateComponent,
    AssigmentIndexComponent,
    QuestionIndexComponent,
    QuestionFormComponent,
    QuestionCreateMoreComponent,
    QuestionCategoryIndexComponent,
    QuestionCategoryFormComponent,
    AssigmentReportComponent,
    ExamFormComponent,
    ExamIndexComponent,
    CorrectBlanAnswerComponent,
    AssignStudentToExamComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      progressBar: true,
      closeButton: true,
      enableHtml: true,
    }),
    AppRoutingModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
    httpInterceptorProviders,
    TranslationService,
    AuthService,
    AuthGuestService,
    UserService,
    RoleService,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static doc: any = document;

  constructor() {
  }



}
