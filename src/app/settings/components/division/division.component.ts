import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent extends SettingTemplate implements OnInit {

  level = null;
  department = null;

  constructor(public settingService: SettingService,
    public levelService: SettingService,
    public departmentService: SettingService) {
    super(settingService);
    this.baseUrl = "divisions";

    this.settingService.baseUrl = "countries";
    this.requiredFields = ['name'];
    this.get();

    // init level
    this.level = new SettingTemplate(this.levelService);
    this.level.requiredFields = ['name'];
    this.level.baseUrl = "levels";
    this.level.get();

    // init department
    this.department = new SettingTemplate(this.departmentService);
    this.department.baseUrl = "departments";
    this.department.requiredFields = ['name', 'level_id', 'division_id'];
    this.department.get();

  }

  ngOnInit() {
  }

}
