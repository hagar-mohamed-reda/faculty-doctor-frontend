import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    this.globalService.get("doctor/exams", params).subscribe((res) => {
      this.response = res;
      this.exams = this.response.data;
      this.reload = false;
      //
      this.prePagniation();
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
