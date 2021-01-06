import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {

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
  public students: any = [];

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
   * types of student
   *
   */
  public types: any = [];

  /**
   * select item to edit it
   *
   */
  public departments: any = [];

  /**
   * fields of student table
   *
   */
  public fields: any = [
    'name',
    'username',
    'level_id',
    'department_id',
    'division_id',
    'faculty_id',
    'code',
    'phone',
    'email',
    'national_id',
    'active',
    'type',
    'created_at',
    'updated_at'
  ];

  /**
   * url of import from excel api
   *
   */
  public importApi = "students/import";

  /**
   * url of excel template file
   *
   */
  public importTemplateUrl = environment.apiUrl + "/students/import-file?api_token="+Auth.getApiToken();

  /**
   * url of export api
   *
   */
  public exportApi = "students/export";

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
      {name: 'student page', url: '#'}
    ];
  }

  /**
   * load all student data
   *
   */
  get(data=null) {
    let params = (data)? data: this.filter;
    this.reload = true;
    this.archiveLoad = false;
    this.globalService.get("students", params).subscribe((res) => {
      this.response = res;
      this.students = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
    });
  }

  /**
   * get all deleted students
   *
   */
  getArchive() {
    this.reload = true;
    this.archiveLoad = true;
    this.globalService.get("students/archive").subscribe((res) => {
      this.students = res;
      this.reload = false;
    });
  }

  /**
   * show add student modal
   *
   */
  create() {
    this.$('#studentAddModal').modal('show');
  }

  /**
   * show add student modal
   *
   */
  edit(item) {
    this.resource = item;
    this.$('#studentEditModal').modal('show');
  }

  /**
   * show import students from excel file
   *
   */
  import() {
    this.$('#importExcelModal').modal('show');
  }

  /**
   * show export students from excel file
   *
   */
  export() {
    this.$('#exportExcelModal').modal('show');
  }

  /**
   * show export students from excel file
   *
   */
  archive(item) {
    let _this = this;
    Message.confirm(Helper.trans("are you sure to arhive this item"), ()=>{
      _this.globalService.destroy("students/delete", item.id).subscribe((r: any)=>{
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
      _this.globalService.destroy("students/restore", item.id).subscribe((r: any)=>{
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
