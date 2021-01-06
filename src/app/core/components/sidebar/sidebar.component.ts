import { Component, ElementRef, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit {

  public role: string;
  public isSuperAdmin: boolean = true;

  constructor(private refElement: ElementRef) { }

  ngOnInit() {
    this.role = localStorage.getItem('AdminRole');
    if (this.role != 'super_admin')
      this.isSuperAdmin = false;
  }

  menuClicked(el: HTMLElement) {
    const others = this.refElement.nativeElement.querySelectorAll('#sidebar .nav-item .dropdown-menu.show');
    if (others != null && others.length > 0) {
      others.forEach(element => {
        element.classList.remove('show');
      });
    }
    document.getElementById(el.getAttributeNode('aria-controls').value).classList.toggle('show');
  }

  get name() {
    return localStorage.getItem('AdminName');
  }

  // get role() {
  //   return localStorage.getItem('AdminRole');
  // }
}
