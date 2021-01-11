import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-category-index',
  templateUrl: './question-category-index.component.html',
  styleUrls: ['./question-category-index.component.scss']
})
export class QuestionCategoryIndexComponent implements OnInit {

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
  public courses: any = [];


  /**
   * select item to edit it
   *
   */
  public categories: any = [];

  /**
   * fields of question table
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


  constructor(private globalService: GlobalService) {
    this.action = () => { this.get(); };
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'question category page', url: '#'}
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
    this.globalService.get("doctor/question-categorys", params).subscribe((res) => {
      this.response = res;
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
  create() {
    this.$('#questionCategoryAddModal').modal('show');
  }

  /**
   * show add question modal
   *
   */
  edit(item) {
    this.resource = item;
    this.$('#questionCategoryEditModal').modal('show');
  }

  /**
   * show import questions from excel file
   *
   */
  import() {
    this.$('#importExcelModal').modal('show');
  }

  /**
   * show export questions from excel file
   *
   */
  export() {
    this.$('#exportExcelModal').modal('show');
  }

  /**
   * show export questions from excel file
   *
   */
  archive(item) {
    let _this = this;
    Message.confirm(Helper.trans("are you sure"), ()=>{
      _this.globalService.destroy("doctor/question-categorys/delete", item.id).subscribe((r: any)=>{
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
    this.globalService.get("doctor/courses").subscribe((r: any) => {
      this.courses = r.data;
      console.log(this.courses);
    });
    this.get();
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
