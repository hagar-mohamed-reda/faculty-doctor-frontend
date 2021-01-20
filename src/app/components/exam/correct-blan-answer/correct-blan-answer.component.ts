import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HashTable } from 'angular-hashtable';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-correct-blan-answer',
  templateUrl: './correct-blan-answer.component.html',
  styleUrls: ['./correct-blan-answer.component.scss']
})
export class CorrectBlanAnswerComponent implements OnInit {

  /**
   * init jquery
   *
   */
  public $: any = $;

  /**
   * init document
   *
   */
  public document: any = document;

  /**
   * Array of items of breadcrumb
   *
   */
  public breadcrumbData = [];

  /**
   * filter inputs
   *
   */
  public response: any = {
    data: []
  };

  /**
   * filter inputs
   *
   */
  public exams: any = [];

  /**
   * filter inputs
   *
   */
  public filter: any = {};

  /**
   * select item to edit it
   *
   */
  public resource: any = {};

  /**
   * select item to edit it
   *
   */
  public courses: any = [];


  /**
   * url of export api
   *
   */
  public action: any;

  /**
   * url of export api
   *
   */
  public reload = false;

  constructor(private globalService: GlobalService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private router: ActivatedRoute) {
    if (this.router.snapshot.queryParamMap.has("exam_id")) {
      this.loadExam(this.router.snapshot.queryParamMap.get('exam_id'));
    }
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'exams page', url: '/exams'},
      {name: 'current blank answer', url: '#'},
      {name: this.resource.name, url: '', trans: false, active: true},
    ];
  }

  /**
   * load all exam data
   *
   */
  loadQuestions(data=null) {
    let params = (data)? data: this.filter;
    this.reload = true;
    this.globalService.get("doctor/exams/blanks/"+this.resource.id, params).subscribe((res) => {
      this.response = res;
      this.reload = false;
      //
      this.prePagniation();
    });
  }

  /**
   * load all exam data
   *
   */
  send() {

    this.globalService.store("doctor/exams/correct/"+this.resource.id, {}).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        Helper.refreshComponent(this.route, '/exams');
      }else {
        Message.error(res.message);
      }
      Helper.loader(false);
    });
  }

  /**
   * load all exam data
   *
   */
  loadExam(id) {
    this.globalService.get("doctor/exams/"+id).subscribe((res) => {
      this.resource = res;
      this.loadQuestions();
      this.initBreadcrumbData();
    });
  }


  /**
   * pre panination
   */
  prePagniation() {
    Helper.prepagination(this.response);
    console.log(this.response);
  }

  ngOnInit() {
    this.initBreadcrumbData();
    let _this = this;
    //
  }
}
