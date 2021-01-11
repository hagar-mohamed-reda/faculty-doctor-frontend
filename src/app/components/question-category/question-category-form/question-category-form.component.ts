import { Component, Input, OnInit } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-question-category-form',
  templateUrl: './question-category-form.component.html',
  styleUrls: ['./question-category-form.component.scss']
})
export class QuestionCategoryFormComponent implements OnInit {

  @Input() title: any;
  @Input() editable: boolean = false;
  @Input() resource: any = {};
  @Input() action: any;

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
    'notes',
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
    };
  }

  /**
   * send data to the server
   * check if edit mode call update
   * else call store
   *
   */
  send() {
    //this.resource.divisions = this.getSelectedDivisions();
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
    this.globalService.store("doctor/question-categorys/store", Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
    this.globalService.update("doctor/question-categorys/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
  loadFile(event, key) {
      Helper.loadImage(event, key, this.resource);
  }

  /**
   * load courses
   */
  loadSettings() {
    this.globalService.get("doctor/courses").subscribe((r: any) => {
      this.courses = r.data;
      console.log(this.courses);
    });
  }

  ngOnInit() {
    this.loadSettings();
  }
}
