import {AfterViewChecked, Component, Inject, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { Auth } from '../shared/auth';
import { Router } from '../../../node_modules/@angular/router';
import { TranslationService } from '../shared/services/translation.service';
import { Translation } from '../shared/translation';
import { Cache } from '../shared/cache';
import { Request } from '../shared/request';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements  OnInit{

  public document: any = document;
  public height = 0;
  public width = 0;
  public style = "";
  public $: any = $;

  constructor(
  private router: Router,
  private translationService: TranslationService) {
    Translation.TRANSLATION_DATA = Cache.get(Translation.TRANSLATION_CACHE_KEY);
    this.height = window.innerHeight - 50;
    this.width = window.innerWidth - 115;
  }

  watchUser() {
    console.log(Auth.getApiToken());
    if (!Auth.getApiToken())
      this.router.navigate(['/login'], {
      }).then().catch();
  }

  ngOnInit() {
    //Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
    Request.addToQueue({observer: this.translationService.get(), action: (r)=>{
      //Cache.remove(Translation.TRANSLATION_CACHE_KEY);
      //Cache.set(Translation.TRANSLATION_CACHE_KEY, r);
      Translation.TRANSLATION_DATA = r;
    }});


    // load all requests in the queueue
    console.log("request count : " + Request.queue.length);
    Request.fire();

    this.$('.app-content').css("width", this.width+"px");
    this.$('.app-content').css("height", this.height+"px");
    let self = this;
    //setTimeout(()=>{
      //self.document.nicescroll('.app-content', { height: this.height });
    //}, 500);
  }

  init() {
  }


}
