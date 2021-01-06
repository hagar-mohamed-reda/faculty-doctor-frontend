import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Input() title: any;
  @Input() editable: boolean = false;
  @Input() resource: any = {};
  @Input() action: any;

  levels: any = [];
  departments: any = [];
  types: any = [];
  isSubmitted = false;
  $: any = $;

  /**
   * required fields of student
   */
  required = [
    "name", "code", "phone", "national_id", "username", "password", "level_id", "department_id"
  ];

  constructor(private globalService: GlobalService) {
    //
    if (!this.editable)
      this.reset();
  }

  /**
   * reset student add form
   *
   */
  reset() {
    this.resource = {
      "active": 1,
      "type": "normal",
      url: "/assets/img/upload.jpg"
    };
  }

  /**
   * send data to the server
   * check if edit mode call update
   * else call store
   *
   */
  send() {
    if (this.editable) {
      this.update();
    } else {
      this.store();
    }
  }

  /**
   * store new student
   *
   */
  store() {
    if (!Helper.validator(this.resource, this.required))
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.store("students/store", Helper.toFormData(this.resource)).subscribe((res: any)=>{
      if (res.status == 1) {
        Message.success(res.message);
        this.reset();
        if (this.action)
          this.action();
      }
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  /**
   * update input student
   *
   */
  update() {
    if (!Helper.validator(this.resource, this.required))
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.update("students/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any)=>{
      if (res.status == 1) {
        Message.success(res.message);
        if (this.action)
          this.action();
      }
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  /**
   * load file object in resource
   */
  loadFile(event) {
      Helper.loadImage(event, 'photo', this.resource);
  }

  /**
   * load all filter data
   * load levels
   * load types
   * load departments
   * load faculties
   */
  loadSettings() {
    this.globalService.get("levels").subscribe((r) => {
      this.levels = r;
    });
    this.globalService.get("departments").subscribe((r) => {
      this.departments = r;
    });
    this.types = ['normal', 'graduation'];
  }
  ngOnInit() {
    this.loadSettings();
  }

}
