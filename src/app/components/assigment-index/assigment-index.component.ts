import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assigment-index',
  templateUrl: './assigment-index.component.html',
  styleUrls: ['./assigment-index.component.scss']
})
export class AssigmentIndexComponent implements OnInit {

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
  public assignments: any = [];

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
   * types of assignment
   *
   */
  public types: any = [];

  /**
   * courses of assignment
   *
   */
  public courses: any = [];

  /**
   * assignments of assignment
   *
   */
  public lectures: any = [];

  /**
   * select item to edit it
   *
   */
  public departments: any = [];


  /**
   * fields of assignment table
   *
   */
  public fields: any = [
    'name',
    'level_id',
    'faculty_id',
    'code',
    'credit_hour',
    'description',
    'final_degree',
    'active',
    'created_at',
    'updated_at'
  ];

  /**
   * url of import from excel api
   *
   */
  public importApi = "assignments/import";

  /**
   * url of excel template file
   *
   */
  public importTemplateUrl = environment.apiUrl + "/assignments/import-file?api_token="+Auth.getApiToken();

  /**
   * url of export api
   *
   */
  public exportApi = "assignments/export";

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
   * isSubmitted
   *
   */
  public isSubmitted = false;

  /**
   * url of export api
   *
   */
  public archiveLoad = false;

  /**
   * auth of user
   *
   */
  public auth = Auth.user();


  constructor(private globalService: GlobalService, private sanitizer: DomSanitizer) {
    this.action = () => { this.get(); };
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'assigment page', url: '#'}
    ];
  }

  /**
   * load all assignment data
   *
   */
  get(data=null) {
    let params = (data)? data: this.filter;
    this.reload = true;
    this.archiveLoad = false;
    this.globalService.get("doctor/assignments", params).subscribe((res) => {
      this.response = res;
      this.assignments = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
    });
  }

  /**
   * load all assignment data
   *
   */
  loadDoctorCourses(data=null) {
    this.globalService.get("doctor/courses").subscribe((res: any) => {
      this.courses = res.data;
    });
  }

  /**
   * load all assignment data
   *
   */
  loadDoctorLectures(data=null) {
    this.globalService.get("doctor/lectures").subscribe((res) => {
      this.lectures = res;
    });
  }

  /**
   * filter with course
   *
   */
  filterWithCourse(course_id) {
    this.filter.course = course_id;
    this.get();
  }


  /**
   * show add assignment modal
   *
   */
  create() {
    this.resource = {};
    this.$('#formModal').modal('show');
  }

  /**
   * show add assignment modal
   *
   */
  edit(item) {
    this.resource = item;
    this.resource.file = null;
    this.$('#formModal').modal('show');
  }

  /**
   * show import assignments from excel file
   *
   */
  import() {
    this.$('#importExcelModal').modal('show');
  }

  /**
   * show export assignments from excel file
   *
   */
  export() {
    this.$('#exportExcelModal').modal('show');
  }

  /**
   * trust url
   *
   */
  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
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
    this.globalService.get("levels").subscribe((r) => {
      this.levels = r;
    });
    this.globalService.get("departments").subscribe((r) => {
      this.departments = r;
    });
    this.types = ['normal', 'graduation'];
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

  loadFile(e, key) {
    Helper.loadImage(e, key, this.resource);
  }

  validate() {
    let valid = true;
    if (!this.resource.course_id) {
      valid = false;
      Message.error(Helper.trans("choice course name"));
    }
    if (!this.resource.lecture_id) {
      valid = false;
      Message.error(Helper.trans("choice lecture name"));
    }
    if (!this.resource.name) {
      valid = false;
      Message.error(Helper.trans("write assigment name"));
    }
    if (!this.resource.degree) {
      valid = false;
      Message.error(Helper.trans("write assigment degree"));
    }
    if (!this.resource.file && !this.resource.id) {
      valid = false;
      Message.error(Helper.trans("upload assigment file"));
    }
    if (!this.resource.date_from || !this.resource.date_to) {
      valid = false;
      Message.error(Helper.trans("choice assigment dates"));
    }
    if (this.resource.date_from && this.resource.date_to) {
      let time1 = new Date(this.resource.date_from).getTime();
      let time2 = new Date(this.resource.date_to).getTime();
      if (time1 >= time2) {
        valid = false;
        Message.error(Helper.trans("date to must be larger than date from"));
      }
    }
    return valid;
  }

  /**
   * send assignment object to api
   *
   */
  send() {
    if (this.resource.id)
      this.update();
    else
      this.store();
  }

  /**
   * store new assignment
   *
   */
  store() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    this.globalService.store("doctor/assignments/store", Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.resource = {};
        this.get();
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
    });
  }

  /**
   * update assignment
   *
   */
  update() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    this.globalService.store("doctor/assignments/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.get();
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
    });
  }

  /**
   * show export questions from excel file
   *
   */
  archive(item) {
    let _this = this;
    Message.confirm(Helper.trans("are you sure"), ()=>{
      _this.globalService.destroy("doctor/assignments/delete", item.id).subscribe((r: any)=>{
        if (r.status == 1) {
          Message.success(r.message);
          this.get();
        }
        else
          Message.error(r.message);
      });
    });
  }

  ngOnInit() {
    this.initBreadcrumbData();
    this.loadSettings();
    this.loadDoctorCourses();
    this.loadDoctorLectures();
    let _this = this;
    //
    setTimeout(()=>{
      _this.setDataContainerStyle();
    }, 500);
  }
}
