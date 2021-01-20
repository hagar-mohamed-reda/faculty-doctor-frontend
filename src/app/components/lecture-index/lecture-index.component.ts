import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLinkActive } from '@angular/router';
import { Helper } from 'src/app/shared/helper';
import { GlobalService } from 'src/app/shared/services/global.service';

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
  lectures: any = [];

  /**
   * import data will be sent
   *
   */
  helper: any = Helper;


  constructor(private router: ActivatedRoute, private globalService: GlobalService) {


    this.router.paramMap.subscribe((res) => {
      console.log(res.get('id'));
      if (res.has('id'))  {
        this.loadCourse(res.get('id'));
      }
    });
  }

  /**
   * init items of breadcrumb
   *
   */
  initBreadcrumbData() {
    this.breadcrumbData = [
      {name: "courses", url: "/courses"},
      {name: this.resource.name, url: '#', active: 1, trans: false}
    ];
  }

  /**
   * show modal
   *
   */
  addLecture() {
      this.$('#choiceCategoryModal').modal('show');
  }

  loadCourse(id) {
    let _this = this;
    this.globalService.get('doctor/courses/'+id).subscribe((res) => {
      this.resource = res;
      this.lectures = this.resource.lectures;
      this.initBreadcrumbData();
      setTimeout(()=>{
        _this.$('[data-toggle="tooltip"]').tooltip();
      }, 500);
    });
  }


  ngOnInit() {
    this.initBreadcrumbData();
  }


}
