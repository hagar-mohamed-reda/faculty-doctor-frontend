import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

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
  isSubmitted: any = false;
  editMode: any = false;

  /**
   * import data will be sent
   *
   */
  categories: any = [
    {"name": 'مج 1'},
    {"name": 'مج 2'}
  ];


  constructor(private router: ActivatedRoute, private globalService: GlobalService, private sanitizer: DomSanitizer) {
      console.log(this.router.snapshot.queryParamMap.get('course_id'));
      if (this.router.snapshot.queryParamMap.has('course_id'))  {
        this.loadCourse(this.router.snapshot.queryParamMap.get('course_id'));
      }

      if (this.router.snapshot.queryParamMap.has("lecture_id")) {
        this.editMode = true;
        this.loadLecture(this.router.snapshot.queryParamMap.get('lecture_id'));
      } else {
        this.reset();
      }
  }

  reset() {
    this.resource = {
      active: 1
    };
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

  loadCourse(id) {
    this.globalService.get('doctor/courses/'+id).subscribe((res) => {
      this.course = res;
      this.initBreadcrumbData();
    });
  }

  loadLecture(id) {
    this.globalService.get('doctor/lectures/'+id).subscribe((res) => {
      this.resource = res;
      //
      if (this.resource.file1)
        this.resource.file1_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.file1_url);

      if (this.resource.file2)
        this.resource.file2_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.file2_url);

      if (this.resource.video)
        this.resource.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.video_url);
      //
      this.resource.video = null;
      this.resource.file1 = null;
      this.resource.file2 = null;
      //
      this.getYouTubeEmbededUrl();
      console.log(this.resource);
    });
  }

  /**
   * validate on lecture data
   *
   */
  validate() {
    let valid = true;
    if (!this.resource.name) {
      Message.error(Helper.trans("write name of lecture"));
      valid = false;
    }

    if (!this.resource.date) {
      Message.error(Helper.trans("choice date of lecture"));
      valid = false;
    }

    if (this.resource.date) {
      let todayTime = new Date((new Date()).toLocaleDateString()).getTime();
      let lectureTime = new Date(this.resource.date).getTime();
      if (lectureTime < todayTime) {
        Message.error(Helper.trans("date of lecture must be large than today"));
        valid = false;
      }
    }

    if (!this.editMode && !this.resource.youtube_url && !this.resource.video && !this.resource.file1 && !this.resource.file2) {
      Message.error(Helper.trans("upload file1, file2, video or youtube url"));
      valid = false;
    }

    if (this.resource.video) {
      if ((this.resource.video.size / 1000000) > 10) {
        Message.error(Helper.trans("max video size 10 MB"));
        valid = false;
      }
    }

    if (this.resource.file1) {
      if ((this.resource.file1.size / 1000000) > 5) {
        Message.error(Helper.trans("max file size 5 MB"));
        valid = false;
      }
    }

    if (this.resource.file2) {
      if ((this.resource.file2.size / 1000000) > 5) {
        Message.error(Helper.trans("max file size 5 MB"));
        valid = false;
      }
    }

    return valid;
  }

  /**
   * send lecture object to api
   *
   */
  send() {
    this.resource.course_id = this.course.id;
    if (this.editMode)
      this.update();
    else
      this.store();
  }

  /**
   * store new lecture
   *
   */
  store() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    this.globalService.store("doctor/lectures/store", Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.reset();
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
    });
  }

  /**
   * update lecture
   *
   */
  update() {
    console.log(this.resource);
    if (!this.validate()) {
      return;
    }
    this.isSubmitted = true;
    this.globalService.store("doctor/lectures/update/"+this.resource.id, Helper.toFormData(this.resource)).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
      this.isSubmitted = false;
    });
  }

  /**
   * convert normal url to embeded url
   *
   */
  getYouTubeEmbededUrl() {
    //var url = "https://www.youtube.com/embed/{id}";
    var id = null;

    console.log(this.resource.youtube_url.split("v=")[1]);
    if (!this.resource.youtube_url)
      return;
    if (this.resource.youtube_url.split("v=").length >= 2)
      id = this.resource.youtube_url.split("v=")[1];

    this.resource.youtube_embeded_url =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ id);

    return this.resource.youtube_embeded_url;
    //this.resource.youtube_embeded_url = this.sanitizer.bypassSecurityTrustUrl(url.replace("{id}", id));
  }

}
