import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { UserService } from '../../../services/user.service';
import { Auth } from '../../../../shared/auth';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { RoleService } from 'src/app/user/services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public doc = AppModule.doc;
  public isSubmitted = false;
  public requiredFields = [
    'name', 'email', 'password', 'username'
  ];

  @Input() resource: any = {};
  @Input() isUpdate = false;
  @Input() updateResources: any;
  public roles: any[] = null;

  constructor(private userService: UserService, private roleService: RoleService) { }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.get().subscribe((res: any) => {
      this.roles = res;
    });
  }

  validate() {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!this.resource[element])
        valid = false;
    });
    return valid;
  }

  send() {
    if (!this.isUpdate)
      this.store();
    else
      this.update();
  }

  store() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all required data'));

    this.isSubmitted = true;
    this.userService.store(this.toFormData()).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message);
        this.resource = {};
        this.updateResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }

  update() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all required data'));

    this.isSubmitted = true;
    this.userService.update(this.resource.id, this.toFormData()).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message);
        this.updateResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }

  /**
   * convert object to form data
   *
   */
  toFormData() {
    let data = new FormData();
    for(let key of Object.keys(this.resource)) {
      if(this.resource[key])
        data.append(key, this.resource[key]);
    }
    return data;
  }

  /**
   * close modal
   */
  closeModal() {
    const id = this.isUpdate? '#updateModal' : '#createModal';
    this.doc.jquery(id).modal('hide');
  }

  /**
   * load personal image
   */
  viewImage(event) {
    Helper.loadImage(event, 'image', this.resource);
  }
}
