import { Component, OnInit, ViewChild } from '@angular/core';
import { HashTable } from '../../../../../../node_modules/angular-hashtable';
import { UserService } from '../../../services/user.service';
import { AppModule } from '../../../../app.module';
import { Router } from '../../../../../../node_modules/@angular/router';
import { Helper } from '../../../../shared/helper';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Message } from 'src/app/shared/message';
import { RoleService } from 'src/app/user/services/role.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  public doc: any = AppModule.doc;

  // Resources list
  public resources: any[] = null;

  // init breadcrum
  public breadcrumbList = [];

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  // update
  public updateItem: any = {};
  public updateResources: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.resources);
  displayedColumns: string[];

  public searchKey: any;

  constructor(private userService: UserService, private router: Router) {
    // init breadcrum
    this.initBreadcrumb();
    this.initDisplayColumns();
    this.initMatDatatable();

    this.updateResources = () => {
      this.loadResources();
    };
  }

  initMatDatatable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initBreadcrumb() {
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'users'}
    ];
  }

  initDisplayColumns() {
    this.displayedColumns = [
      'image', 'name', 'email', 'password', 'username', 'phone', 'role', "action"
    ];
  }

  refreshDataSource(data: any[]) {
    this.resources = data;
    this.dataSource.data = data;
  }

  destroy(id) {
    this.doc.swal.confirm(Helper.trans('are you sure'), () => {
      this.userService.destroy(id).subscribe((res: any) => {
        if (res.status == 1) {
          Message.success(res.message);
          this.loadResources();
        }
        else
          Message.error(res.message);
      });
    });
  }

  loadResources() {
    this.userService.get().subscribe( (res: any) => {
      this.resources = res;
      this.dataSource.data = res;
      //
      this.refreshDataSource(res);
    });
  }


  edit(item) {
    this.updateItem = item;
    this.doc.jquery('#updateModal').modal('show');
  }


  ngOnInit() {
    this.loadResources();
    this.searchKey = "";
  }

  showUpdateModal(item) {
    this.updateItem = item;
  }

  search(filterValue: string) {
    if (this.dataSource)
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
