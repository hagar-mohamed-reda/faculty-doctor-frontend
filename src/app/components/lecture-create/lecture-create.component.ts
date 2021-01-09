import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-lecture-create',
  templateUrl: './lecture-create.component.html',
  styleUrls: ['./lecture-create.component.scss']
})
export class LectureCreateComponent implements OnInit {


  resource: any = {};

  course: any = {};

  /**
   * breadcrumbs items
   *
   */
  breadcrumbData: any = [];

  /**
   * group object of view
   *
   */
  group = null;

  /**
   * group object of view
   *
   */
  $: any = $;

  /**
   * import data will be sent
   *
   */
  importData: any = {};

  /**
   * import data will be sent
   *
   */
  categories: any = [
    {"name": 'مج 1'},
    {"name": 'مج 2'}
  ];


  constructor() {
    this.resource.name = "course name";

  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: "courses", url: "/courses"},
      {name: "lectures", url: "/lectures/"+this.course.id},
      {name: "add lecture", url: '#', active: 1}
    ];
  }

  ngOnInit() {
    this.initBreadcrumbData();
  }

  loadFile(e, key) {
    Helper.loadImage(e, key, this.resource);
  }

}
