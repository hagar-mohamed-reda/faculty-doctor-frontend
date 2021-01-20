import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../../../shared/auth';
import { SystemSettingService } from '../../services/system-setting.service';
import { Helper } from '../../../shared/helper';
import { Observable, timer } from 'rxjs';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavBarComponent implements OnInit {

  /**
   * observe time to load notifications
   * 2 minuties
   */
  public static OBSERVE_TIME = 2 * 60 * 1000;

  public doc: any = document;
  public sidebarOpened = false;
  public user: any = Auth.user();
  public notifications: any = [];
  public message: string;
  setting: any = {};
  observer = timer(1000, 5000);

  constructor(private authService: AuthService,
              private router: Router,
              private globalService: GlobalService,
              private systemSettingService: SystemSettingService) {
  }

  loadSetting() {
    this.globalService.get('global-setting').subscribe((res)=>{
      this.setting = res;
    });
  }

  initMessage(arr) {
    this.message = Helper.trans("You have {n} notifications").replace("{n}", arr.length);
  }

  ngOnInit() {
    this.user = Auth.user();
    this.initMessage(this.notifications);
    this.loadSetting();
    //
    this.observeNotifications();
  }

  public observeNotifications() {
    this.observer.subscribe((v) => {
      if (this.doc.notify == 1)
        this.loadNotifications();
    });
  }//

  loadNotifications() {
    this.systemSettingService.getNotifications().subscribe((res: any[]) => {
      res.forEach(element => {
        this.notifications.push(element);
      });
      this.notifications.reverse();
      //
      if (res.length > 0) {
        this.initMessage(res);
        this.doc.playSound('ios_notification');
      }
      this.doc.notify = 0;
    });
  }

  logout(){
    var _this = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      Auth.logout();
      _this.router.navigate(['/login']).then().catch();
    });
  }

  canAccessStudentAffair() {
    let permissions = ["application_add","applicattion_edit","application_remove","application_read","student_read","student_edit","student_add","student_remove","required_document_read","required_document_edit","required_document_add","required_document_remove","application_required","application_setting"];
    return Auth.canOr(permissions);
  }
}
