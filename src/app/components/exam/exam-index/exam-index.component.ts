import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-index',
  templateUrl: './exam-index.component.html',
  styleUrls: ['./exam-index.component.scss']
})
export class ExamIndexComponent implements OnInit {

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
  public levels: any = [];

  /**
   * types of exam
   *
   */
  public types: any = [];

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
   * fields of exam table
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
   * url of export api
   *
   */
  public action: any;

  /**
   * url of export api
   *
   */
  public reload = false;

  constructor(private globalService: GlobalService, private sanitizer: DomSanitizer) {
    this.action = () => { this.get(); };
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'exams page', url: '#'}
    ];
  }

  /**
   * load all exam data
   *
   */
  get(data=null) {
    let params = (data)? data: this.filter;
    this.reload = true;
    this.archiveLoad = false;
    this.globalService.get("doctor/exams", params).subscribe((res) => {
      this.response = res;
      this.exams = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
    });
  }

  /**
   * get all deleted exams
   *
   */
  getArchive() {
    this.reload = true;
    this.archiveLoad = true;
    this.globalService.get("doctor/exams/archive").subscribe((res) => {
      this.exams = res;
      this.reload = false;
    });
  }

  /**
   * show add exam modal
   *
   */
  create() {
    this.$('#examAddModal').modal('show');
  }

  /**
   * show add exam modal
   *
   */
  createMore() {
    this.$('.create-more').slideToggle(500);
  }

  /**
   * show add exam modal
   *
   */
  edit(item) {
    this.resource = item;
    this.resource.image = null;
    this.$('#examEditModal').modal('show');
  }

  /**
   * show export exams from excel file
   *
   */
  archive(item, index) {
    let _this = this;
    Message.confirm(Helper.trans("are you sure"), ()=>{
      _this.globalService.destroy("doctor/exams/delete", item.id).subscribe((r: any)=>{
        if (r.status == 1) {
          Message.success(r.message);
          this.get();
        }
        else
          Message.error(r.message);
      });
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
    this.globalService.get("doctor/exam-levels").subscribe((r) => {
      this.levels = r;
    });
    this.globalService.get("doctor/exam-types").subscribe((r) => {
      this.types = r;
    });
    this.globalService.get("doctor/exam-categorys").subscribe((r: any) => {
      this.categories = r.data;
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
    setTimeout(()=>{
      _this.setDataContainerStyle();
    }, 500);
  }
}
