import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-index',
  templateUrl: './question-index.component.html',
  styleUrls: ['./question-index.component.scss']
})
export class QuestionIndexComponent implements OnInit {

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
   * types of question
   *
   */
  public types: any = [];

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
  public importApi = "questions/import";

  /**
   * url of excel template file
   *
   */
  public importTemplateUrl = environment.apiUrl + "/questions/import-file?api_token="+Auth.getApiToken();

  /**
   * url of export api
   *
   */
  public exportApi = "questions/export";

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
    this.globalService.get("questions", params).subscribe((res) => {
      this.response = res;
      this.questions = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
    });
  }

  /**
   * get all deleted questions
   *
   */
  getArchive() {
    this.reload = true;
    this.archiveLoad = true;
    this.globalService.get("questions/archive").subscribe((res) => {
      this.questions = res;
      this.reload = false;
    });
  }

  /**
   * show add question modal
   *
   */
  create() {
    this.$('#questionAddModal').modal('show');
  }

  /**
   * show add question modal
   *
   */
  edit(item) {
    this.resource = item;
    this.$('#questionEditModal').modal('show');
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
    Message.confirm(Helper.trans("are you sure to arhive this item"), ()=>{
      _this.globalService.destroy("questions/delete", item.id).subscribe((r: any)=>{
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
   * restore item from archive
   *
   */
  restore(item) {
    let _this = this;
    Message.confirm(Helper.trans("are to restore item from archive"), ()=>{
      _this.globalService.destroy("questions/restore", item.id).subscribe((r: any)=>{
        if (r.status == 1) {
          Message.success(r.message);
          _this.getArchive();
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
    this.globalService.get("levels").subscribe((r) => {
      this.levels = r;
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
