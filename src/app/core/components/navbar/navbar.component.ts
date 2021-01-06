import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../../../shared/auth';
import { SystemSettingService } from '../../services/system-setting.service';
import { Helper } from '../../../shared/helper';
import { Observable, of } from 'rxjs';
import { Message } from 'src/app/shared/message';

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

  public notify = of(this.doc.notify);

  constructor(config: NgbDropdownConfig,private authService: AuthService,
              private router: Router, private systemSettingService: SystemSettingService) {
    config.placement = 'bottom-right';
  }

  initMessage(arr) {
    this.message = Helper.trans("You have {n} notifications").replace("{n}", arr.length);
  }

  ngOnInit() {
    this.user = Auth.user();
    this.initMessage(this.notifications);
    this.loadNotifications();
    //
    this.observeNotifications();
  }

  public observeNotifications() {
    setInterval(() => {
      if (this.doc.notify == 1)
        this.loadNotifications();
    }, 5000);
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

  canAccessSafe() {
    let permissions = ["safe_student_payment","safe_student_service","safe_student_my_installment","safe_student_installment","safe_note","safe_setting","safe_discount","safe_balance_reset","safe_service"];
    return Auth.canOr(permissions);
  }

  canAccessAccountSettings() {
    let permissions = ["service_read","service_edit","service_add","service_remove","safe_read","safe_edit","safe_remove","safe_add","academic_expense_read","academic_expense_edit","academic_expense_add","discount_type_read","discount_type_add","discount_type_remove","installment_report","report_creator_report","student_balance_report","student_discount_report","student_detail_report","payment_detail_report","account_setting","discount_type_edit","academic_expense_remove"];
    return Auth.canOr(permissions);
  }

  canAccessCardExport() {
    let permissions = ["card_export","card_export_report"];
    return Auth.canOr(permissions);
  }

  canAccessMainSettings() {
    let permissions = ["translation","permission","student_code_series","relation","parent_job","nationality","language","case_constraint","registeration_status","registeration_method","academic_year","qualification_type","qualification","department","division","level","city","government","country"];
    return Auth.canOr(permissions);
  }

  canAccessMilitary() {
    let permissions = ["military_status","military_area"];
    return Auth.canOr(permissions);
  }

  canAccessAcademic() {
    let permissions = ["result_transfer","control_report","control","open_course","academic_setting","doctor_remove","doctor_add","doctor_edit","doctor_read","degree_map_remove","degree_map_add","degree_map_edit","degree_map_read","course_category_remove","course_category_add","course_category_edit","course_category_read","course_remove","course_add","course_edit","course_read","student_register"];
    return Auth.canOr(permissions);
  }

  canAccessUsers() {
    let permissions = ["role_remove","role_add","role_edit","role_read","user_remove","user_add","user_edit","user_read"];
    return Auth.canOr(permissions);
  }
}
