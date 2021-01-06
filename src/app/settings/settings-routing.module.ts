import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TranslationComponent } from './translation/translation.component';
import { AcademicYearComponent } from './components/academic-year/academic-year.component';
import { DivisionComponent } from './components/division/division.component';
import { PermissionComponent } from './components/permission/permission.component';
import { Auth } from '../shared/auth';
import { AuthGuestService } from '../shared/middlewares/auth-guest.service';
import { DegreeComponent } from './components/degree/degree.component';
import { DegreeMapComponent } from './components/degree-map/degree-map.component';
import { ResearchDegreeMapComponent } from './components/research-degree-map/research-degree-map.component';
import { SpecialComponent } from './components/special/special.component';
import { FacultyComponent } from './components/faculty/faculty.component';

const routes: Routes = [
  {
    // RegisterationMethodsModule
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "academic-year",
        component: AcademicYearComponent
      },
      {
        path: "division",
        component: DivisionComponent
      },
      {
        path: "doctor-degree",
        component: DegreeComponent
      },
      {
        path: "degree-map",
        component: DegreeMapComponent
      },
      {
        path: "research-degree-map",
        component: ResearchDegreeMapComponent
      },
      {
        path: "special",
        component: SpecialComponent
      },
      {
        path: "faculty",
        component: FacultyComponent
      },
      {
        path: "translations",
        component: TranslationComponent
      },
      {
        path: "permissions",
        component: PermissionComponent
      },



    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
