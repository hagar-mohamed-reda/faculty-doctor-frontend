import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-question-create-more',
  templateUrl: './question-create-more.component.html',
  styleUrls: ['./question-create-more.component.scss']
})
export class QuestionCreateMoreComponent implements OnInit {

  @Input() action:any;
  choiceNumber: any = 2;
  resource: any = {
    questions: []
  };
  types: any = [];
  categories: any = [];
  levels: any = [];
  courses: any = [];
  choices: any = [2, 3, 4, 5];
  isSubmitted: any = false;
  total = 0;

  constructor(private globalService: GlobalService)
  {

  }

  ngOnInit() {
    this.loadSettings();
  }

  initQuestionChoices() {
    let resource = {
      choices: []
    };
    if (this.resource.question_type_id == 1) {
      resource.choices = [
        {"text": Helper.trans('true'), is_answer: true, readonly: true},
        {"text": Helper.trans('false'), is_answer: false, readonly: true},
      ];
    } else if (this.resource.question_type_id == 2) {
      for(let index = 0; index < this.choiceNumber; index ++) {
        resource.choices.push({text: '', is_answer: index == 0? true : false, readonly: false});
      }
    } else if (this.resource.question_type_id == 3) {
      resource.choices = [
        {"text": '', is_answer: true, readonly: false}
      ];
    }

    return resource;
  }

  addRow() {
    if (!this.resource.question_type_id)
      return Message.error(Helper.trans('choice question type first'));
    if (this.resource.question_type_id == 2 && this.choiceNumber < 2)
      return Message.error(Helper.trans('choice number must be larger than 2 choice'));

    this.resource.questions.push(this.initQuestionChoices());
  }

  /**
   * toggle is answer of choices
   *
   */
  toggleIsAnswer(item, checked, index, slide) {
    item.choices.forEach((element, i) => {
      if (i == index && checked)
        element.is_answer = true;
      else
        element.is_answer = false;
    });

  }

  /**
   * remove row in question
   * @param index
   */
  removeRow(index) {
    Message.confirm(Helper.trans('are you sure'), () => {
      this.resource.questions.splice(index, 1);
    });
  }

  /**
   * load file in object
   * @param e event of input
   * @param k key of object
   * @param m model of object
   */
  loadFile(e, k, m) {
    Helper.loadImage(e, k, m);
  }

  /**
   * validate on one row
   *
   */
  validateOneRow(row) {
    let valid = Helper.validator(row, ['text', 'question_level_id']);
    let isAnswer = false;

    row.choices.forEach(element => {
      if (!element.text)
        valid = false;

      if (element.is_answer)
        isAnswer = true;
    });

    if (!isAnswer)
      valid = false;

    return valid;
  }

  /**
   * validate on all questions
   *
   */
  validate() {
    let valid = true;
    this.resource.questions.forEach(element => {
      if (!this.validateOneRow(element))
        valid = false;
    });

    return valid;
  }

  store() {
    if (!this.validate()) {
      return Message.error(Helper.trans('please fill all data or select one choice foreach questions'));
    }

    if (this.resource.questions.length < 1)
      return Message.error(Helper.trans('add one question at least'));

    if (!this.resource.course_id)
      return Message.error(Helper.trans('choice course'));

    if (!this.resource.question_category_id)
      return Message.error(Helper.trans('choice question category'));

    this.total = this.resource.questions.length;
    this.isSubmitted = true;
    this.perFormStore();
  }

  perFormStore() {
    let item = this.resource.questions.pop();

    if (item) {
      item.question_choices = JSON.stringify(item.choices);
      item.course_id = this.resource.course_id;
      item.question_category_id = this.resource.question_category_id;
      item.question_type_id = this.resource.question_type_id;
      this.globalService.store("doctor/questions/store", Helper.toFormData(item)).subscribe((res: any)=>{
        if (res.status == 0)
          Message.error(res.message);

        this.perFormStore();
      });
    } else {
      this.end();
    }
  }

  end() {
    Message.success(Helper.trans('done'));
    this.isSubmitted = false;
    if (this.action)
      this.action();
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


}
