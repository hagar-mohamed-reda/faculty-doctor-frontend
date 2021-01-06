import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NavBarComponent} from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SidebarComponent,
    HomeComponent,
    MainPageComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavBarComponent,
    SidebarComponent,
    MainPageComponent
  ]
})
export class CoreModule {
}
