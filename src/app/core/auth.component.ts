import {AfterViewChecked, Component, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AuthComponent  implements AfterViewChecked{
  constructor(@Inject(DOCUMENT) private document: Document) {
  }
  ngAfterViewChecked(): void {
    setTimeout(() => {
      // this.document.getElementById('start-loader').remove();
    }, 1500);
  }
}
