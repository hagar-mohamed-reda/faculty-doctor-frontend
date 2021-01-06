import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture-index',
  templateUrl: './lecture-index.component.html',
  styleUrls: ['./lecture-index.component.scss']
})
export class LectureIndexComponent implements OnInit {


  resource: any = {};

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
      {name: this.resource.name, url: '#', active: 1}
    ];
  }

  /**
   * show modal
   *
   */
  addLecture() {
      this.$('#choiceCategoryModal').modal('show');
  }

  /**
   * show modal of register doctor
   *
   */
  registerDoctorModal() {
    this.$('#registerCourseToDoctor').modal('show');
  }

  /**
   * show modal of register students
   *
   */
  registerStudentModal() {
    this.$('#registerCourseToStudent').modal('show');
  }

  ngOnInit() {
    this.initBreadcrumbData();
  }


}
