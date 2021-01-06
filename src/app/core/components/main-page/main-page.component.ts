import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  /**
   * Array of items of breadcrumb
   *
   */
  public breadcrumbData = [];


  constructor() { }

  ngOnInit() {
    this.initBreadcrumbData();
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: 'dashboard', url: '#'}
    ];
  }

}
