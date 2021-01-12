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
    'text',
    'question_type_id',
    'question_level_id',
    'question_category_id',
    'course_id'
  ];

  constructor(private globalService: GlobalService) {
    //
    if (!this.editable)
      this.reset();
  }

  initQuestionChoices() {
    this.resource.choices = [];
    if (this.resource.question_type_id == 1) {
      this.resource.choices = [
        {"text": Helper.trans('true'), is_answer: true, readonly: true},
        {"text": Helper.trans('false'), is_answer: false, readonly: true},
      ];
    } else if (this.resource.question_type_id == 2) {
      this.choicesNumber = prompt(Helper.trans('enter choice number'));
      if (this.choicesNumber < 2) {
        Message.error(Helper.trans('choice number must be larger than 2 choice'));
        this.resource.question_type_id = null;
        return;
      }
      for(let index = 0; index < this.choicesNumber; index ++) {
        this.resource.choices.push({text: '', is_answer: index == 0? true : false, readonly: false});
      }
    } else if (this.resource.question_type_id == 3) {
      this.resource.choices = [
        {"text": '', is_answer: true, readonly: false}
      ];
    }
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
   * toggle is answer of choices
   *
   */
  toggleIsAnswer(item, checked, index) {
    this.resource.choices.forEach((element, i) => {
      console.log(i);
      if (i == index && checked) {
        element.is_answer = true;
      }
      else
        element.is_answer = false;
    });
  }

  validate() {
    let valid = Helper.validator(this.resource, this.required);
    let isAnswer = false;

    this.resource.choices.forEach(element => {
      if (!element.text)
        valid = false;

      if (element.is_answer)
        isAnswer = true;
    });

    if (!isAnswer)
      valid = false;

    console.log(this.resource.choices);
    return valid;
  }

  /**
   * send data to the server
   * check if edit mode call update
   * else call store
   *
   */
  send() {
    this.resource.question_choices = JSON.stringify(this.resource.choices);
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
    if (!this.validate())
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.store("doctor/questions/store", Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
    if (!this.validate())
      return Message.error("fill all required data");

    this.isSubmitted = true;
    this.globalService.update("doctor/questions/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any)=>{
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
   * load levels
   * load types
   * load categories
   */
  loadSettings() {
    this.globalService.get("doctor/courses").subscribe((r: any) => {
      this.courses = r.data;
      console.log(this.courses);
    });
    this.globalService.get("doctor/question-levels").subscribe((r) => {
      this.levels = r;
    });
    this.globalService.get("doctor/question-types").subscribe((r) => {
      this.types = r;
    });
    this.globalService.get("doctor/question-categorys").subscribe((r: any) => {
      this.categories = r.data;
    });
  }
  ngOnInit() {
    this.loadSettings();
  }
}
