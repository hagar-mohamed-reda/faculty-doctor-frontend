import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.scss']
})
export class AcademicYearComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "academic-years";
    this.requiredFields = ['start_date', 'end_date'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
