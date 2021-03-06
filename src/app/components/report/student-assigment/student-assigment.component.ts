import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-assigment',
  templateUrl: './student-assigment.component.html',
  styleUrls: ['./student-assigment.component.scss']
})
export class StudentAssigmentComponent implements OnInit {

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
  public response: any = {};

  /**
   * filter inputs
   *
   */
  public questions: any = [];

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
  public levels: any = [];

  /**
   * select item to edit it
   *
   */
  public departments: any = [];

  /**
   * types of question
   *
   */
  public lectures: any = [];

  /**
   * select item to edit it
   *
   */
  public categories: any = [];

  /**
   * select item to edit it
   *
   */
  public courses: any = [];

  /**
   * select item to edit it
   *
   */
  public assignments: any = [];

  /**
   * fields of question table
   *
   */
  public fields: any = [
    'name',
  ];

  /**
   * url of import from excel api
   *
   */
  public importApi = "doctor/questions/import";

  /**
   * url of excel template file
   *
   */
  public importTemplateUrl = environment.apiUrl + "/doctor/questions/import-file?api_token="+Auth.getApiToken();

  /**
   * url of export api
   *
   */
  public exportApi = "doctor/questions/export";

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

  /**
   * url of export api
   *
   */
  public archiveLoad = false;

  /**
   * url of export api
   *
   */
  public addMore = false;

  /**
   * url of export api
   *
   */
  public pages: any = [5, 10, 50, 100];


  constructor(private globalService: GlobalService, private sanitizer: DomSanitizer) {
    this.filter.page_length = 5;
    this.action = () => { this.get(); };
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'questions page', url: '#'}
    ];
  }

  /**
   * load all question data
   *
   */
  get(data=null) {
    let params = (data)? data: this.filter;
    this.reload = true;
    this.archiveLoad = false;
    this.globalService.get("doctor/student-assignments", params).subscribe((res: any) => {
      this.response = res.students;
      this.response.assignments = res.assignments;
      this.questions = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
    });
  }


  /**
   * show add question modal
   *
   */
  createMore() {
    this.$('.create-more').slideToggle(500);
  }

  /**
   * show add question modal
   *
   */
  edit(item) {
    this.resource = item;
    this.resource.image = null;
    this.$('#questionEditModal').modal('show');
  }

  /**
   * show export questions from excel file
   *
   */
  send() {
    let data = [];
    this.response.data.forEach(element => {
      element.assignments.forEach(e => {
        data.push({
          assignment_id: e.id,
          student_assignment_id: e.student_assignment_id,
          student_grade: e.student_grade,
          student_id: element.id
        });
      });
    });

    this.globalService.store("doctor/update-assignments", {data: data}).subscribe((r: any)=>{
      if (r.status == 1) {
        Message.success(r.message);
        this.get();
      }
      else
        Message.error(r.message);
    });
  }


  /**
   * load all filter data
   * load levels
   * load types
   * load departments
   * load faculties
   */
  loadSettings() {
    this.get();
    //
    this.globalService.get("doctor/courses").subscribe((r: any) => {
      this.courses = r.data;
    });
    this.globalService.get("doctor/assignments").subscribe((r: any) => {
      this.assignments = r.data;
    });
    this.globalService.get("levels").subscribe((r) => {
      this.levels = r;
    });
    this.globalService.get("doctor/lectures").subscribe((r: any) => {
      this.lectures = r;
    });
    this.globalService.get("departments").subscribe((r: any) => {
      this.departments = r;
    });
  }

  /**
   * pre panination
   */
  prePagniation() {
    Helper.prepagination(this.response);
    console.log(this.response);
  }

  setDataContainerStyle() {
    let height = (window.innerHeight - 250) + "px";
    this.document.nicescroll('.data-container', {height: height});
  }

  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.initBreadcrumbData();
    this.loadSettings();
    let _this = this;
    //
  }
}
