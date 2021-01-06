import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-avatar',
  templateUrl: './app-avatar.component.html',
  styleUrls: ['./app-avatar.component.scss']
})
export class AppAvatarComponent implements OnInit {

  @Input() icon: any;
  @Input() text: any;
  @Input() url: any;
  @Input() width: any;
  @Input() height: any;
  @Input() style: any;
  @Input() class: any;

  colors: any = [];
  color: any = null;

  constructor() {
    if (!this.width)
      this.width = "100%";
    if (!this.height)
      this.height = "100px";

    if (!this.url && !this.icon && !this.text)
      this.icon = "fa fa-user";

  }

  initColors() {
    this.colors = [
            "w3-red",
            "w3-pink",
            "w3-green",
            "w3-blue",
            "w3-purple",
            "w3-deep-purple",
            "w3-indigo",
            "w3-teal",
            "w3-orange",
            "w3-blue-gray",
            "w3-dark-gray",
            "w3-brown"
    ];
  }

  randColor() {
    let index = Math.ceil(Math.random() * (this.colors.length - 1));
    if (!this.color)
      this.color = this.colors[index];
  }

  ngOnInit() {
    this.initColors();
    this.randColor();
  }

}
