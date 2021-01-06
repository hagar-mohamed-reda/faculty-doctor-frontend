import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  $: any = $;

  constructor(private http: HttpClient) { }

  /**
   * get services from api
   *
   */
  public getList(data) {
    return this.http.get('translations/get?api_token=' + Auth.getApiToken() + "&"+this.$.param(data),);
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('translations?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public update(data) {
    return this.http.post('translations/update' + '?api_token=' + Auth.getApiToken(), data);
  }

}
