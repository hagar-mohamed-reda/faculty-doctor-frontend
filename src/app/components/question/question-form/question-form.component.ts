import { Component, Input, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() title: any;
  @Input() editable: boolean = false;
  @Input() resource: any = {};
  @Input() action: any;

  levels: any = [];
  departments: any = [];
  divisions: any = [];
  types: any = [];
  categories: any = [];
  courses: any = [];
  isSubmitted = false;
  selectedDivisions = new HashTable<any, any>();
  $: any = $;
  choicesNumber: any = 1;

  /**
   * required fields of course
   */
  required = [
    'name',
    'level_id',
    'code',
    'credit_hour',
    'final_degree'
  ];

  constructor(private globalService: GlobalService) {
    //
    if (!this.editable)
      this.reset();
  }

  /**
   * reset course add form
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
    this.resource.divisions = this.getSelectedDivisions();
    //
    if (this.editable) {
      this.update();
    } else {
      this.store();
    }
  }

  /**
   * store new course
   *
   */
  store() {
    if (!Helper.validator(this.resource, this.required))
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.store("courses/store", Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
   * update input course
   *
   */
  update() {
    if (!Helper.validator(this.resource, this.required))
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.update("courses/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
   * get selected divisions
   *
   */
  getSelectedDivisions() {
    let arr = [];
    this.divisions.forEach(element => {
      if (element.selected) {
        arr.push(element.id);
      }
    });
    return arr;
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
    this.globalService.get("divisions").subscribe((r) => {
      this.divisions = r;
    });
    this.types = ['normal', 'graduation'];
  }
  ngOnInit() {
    this.loadSettings();
  }
}
