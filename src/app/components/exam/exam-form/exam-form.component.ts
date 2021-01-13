import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HashTable } from 'angular-hashtable';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  resource: any = {
    details: []
  };
  helper: any = Helper;
  window: any = window;
  filter: any = {};
  breadcrumbData: any = [];
  $: any = $;
  isSubmitted: any = false;
  editMode: any = false;
  response: any = {};
  courses: any = [];
  levels: any = [];
  questionTypes: any = [];
  questionLevels: any = [];
  selectedQuestions = new HashTable<any, any>();
  selectQuestionTypes = new HashTable<any, any>();
  selectQuestionLevels = new HashTable<any, any>();
  types: any = ['normal', 'midterm', 'final'];
  isLoadQuestions = false;


  constructor(private router: ActivatedRoute, private globalService: GlobalService, private sanitizer: DomSanitizer) {

      if (this.router.snapshot.queryParamMap.has("exam_id")) {
        this.editMode = true;
        this.loadexam(this.router.snapshot.queryParamMap.get('exam_id'));
      } else {
        this.reset();
      }
  }

  reset() {
    this.resource = {
      details: []
    };
  }

  toggleQuestion(item) {
    if (this.selectedQuestions.has(item.id)) {
      this.selectedQuestions.remove(item.id);
    } else {
      this.selectedQuestions.put(item.id, item);
    }
  }

  addRow() {
    this.resource.details.push({});
  }

  filterQuestions() {
    this.selectQuestionTypes = new HashTable();
    this.selectQuestionLevels = new HashTable();
    this.resource.details.forEach(element => {
      if (element.question_type_id)
      this.selectQuestionTypes.put(element.question_type_id, element.question_type_id);
      if (element.question_level_id)
      this.selectQuestionLevels.put(element.question_level_id, element.question_level_id);
    });

    this.filter.question_types = this.selectQuestionTypes.getKeys();
    this.filter.question_levels = this.selectQuestionLevels.getKeys();
    //
    this.loadQuestions();
  }

  removeRow(index) {
    Message.confirm(Helper.trans('are you sure'), () => {
      this.resource.details.splice(index, 1);
    });
  }


  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: "exams page", url: "/exams"},
      {name: "add exam", url: '#', active: 1}
    ];
  }

  ngOnInit() {
    this.loadQuestions();
    this.loadSettings();
    this.initBreadcrumbData();
  }

  loadFile(e, key) {
    Helper.loadImage(e, key, this.resource);
  }

  loadQuestions(data=null) {
    this.isLoadQuestions = true;
    this.filter.course_id = this.resource.course_id;
    let params = (data)? data: this.filter;
    this.globalService.get('doctor/questions', params).subscribe((res) => {
      this.response = res;
      this.prePagniation();
      this.isLoadQuestions = false;
    });
  }

  /**
   * pre panination
   */
  prePagniation() {
    Helper.prepagination(this.response);
    console.log(this.response);
  }

  loadSettings() {
    this.globalService.get('doctor/question-types').subscribe((res) => {
      this.questionTypes = res;
    });
    this.globalService.get('doctor/question-levels').subscribe((res) => {
      this.questionLevels = res;
    });
    this.globalService.get('doctor/courses').subscribe((res:any) => {
      this.courses = res.data;
    });
  }

  loadexam(id) {
    this.globalService.get('doctor/exams/'+id).subscribe((res) => {
      this.resource = res;
      //
      if (this.resource.file1)
        this.resource.file1_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.file1_url);

      if (this.resource.file2)
        this.resource.file2_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.file2_url);

      if (this.resource.video)
        this.resource.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.video_url);
      //
      this.resource.video = null;
      this.resource.file1 = null;
      this.resource.file2 = null;
      //
      this.getYouTubeEmbededUrl();
      console.log(this.resource);
    });
  }

  getQuestionNumber() {
    let number = 0;
    this.resource.details.forEach(element => {
      number += element.number;
    });
    return number;
  }

  /**
   * validate on exam data
   *
   */
  validate() {
    let valid = Helper.validator(this.resource, ['name', 'type', 'course_id', 'start_time', 'end_time', 'minutes']);

    if (!valid) {
      Message.error(Helper.trans("fill all data"));
    }
    this.resource.details.forEach(element => {
      if (!Helper.validator(element, ['question_type_id', 'question_level_id', 'total', 'number'])) {
        Message.error(Helper.trans("enter all data of exam details"));
        valid = false;
      }
    });

    if (this.selectedQuestions.size() <= 0 || this.selectedQuestions.size() < this.getQuestionNumber()){
      Message.error( Helper.trans("select at least {n} questions").replace("{n}", this.getQuestionNumber())  );
      valid = false;
    }

    return valid;
  }

  /**
   * send exam object to api
   *
   */
  send() {
    this.resource.exam_details = JSON.stringify(this.resource.details);
    this.resource.selected_questions = JSON.stringify(this.selectedQuestions.getKeys());
    if (this.editMode)
      this.update();
    else
      this.store();
  }

  /**
   * store new exam
   *
   */
  store() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    Helper.loader(true);
    this.globalService.store("doctor/exams/store", Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.reset();
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      Helper.loader(false);
    });
  }

  /**
   * update exam
   *
   */
  update() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    Helper.loader(true);
    this.globalService.store("doctor/exams/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
      Helper.loader(false);
    });
  }

  /**
   * convert normal url to embeded url
   *
   */
  getYouTubeEmbededUrl() {
    //var url = "https://www.youtube.com/embed/{id}";
    var id = null;

    console.log(this.resource.youtube_url.split("v=")[1]);
    if (!this.resource.youtube_url)
      return;
    if (this.resource.youtube_url.split("v=").length >= 2)
      id = this.resource.youtube_url.split("v=")[1];

    this.resource.youtube_embeded_url =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ id);

    return this.resource.youtube_embeded_url;
    //this.resource.youtube_embeded_url = this.sanitizer.bypassSecurityTrustUrl(url.replace("{id}", id));
  }

}
