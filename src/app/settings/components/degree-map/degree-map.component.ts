import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { SettingTemplate } from '../../setting-template';

@Component({
  selector: 'app-degree-map',
  templateUrl: './degree-map.component.html',
  styleUrls: ['./degree-map.component.scss']
})
export class DegreeMapComponent extends SettingTemplate implements OnInit {


  constructor(public settingService: SettingService) {
    super(settingService);
    this.baseUrl = "degree-map";
    this.requiredFields = ['name', 'gpa', 'key', 'percent_from', 'percent_to'];
    this.get();
  }

  ngOnInit() {
  }


  action() {
    this.get();
  }
}
