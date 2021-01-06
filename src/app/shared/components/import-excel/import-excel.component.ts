import { Component, Input, OnInit } from '@angular/core';
import { Helper } from '../../helper';
import { Message } from '../../message';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {

  /**
   * title of modal
   *
   */
  @Input() title = "";

  /**
   * url of api to import excel file
   *
   */
  @Input() apiUrl = "";

  /**
   * url of api to import excel file
   *
   */
  @Input() action: any;

  /**
   * url of template of excel file
   *
   */
  @Input() templateUrl = "";

  /**
   * url of template of excel file
   *
   */
  @Input() data = {};

  /**
   * init jquery
   *
   */
  $: any  = $;

  /**
   * current step of import steps
   *
   */
  step = 1;

  /**
   * resource object will be sent to server
   *
   */
  resource: any = {};

  /**
   * is the file uploading to server
   *
   */
  isSubmitted: boolean = false;

  constructor(private excelService: ExcelService) { }

  /**
   * reset all data
   */
  reset() {
    this.resource = {};
    this.step = 1;
  }

  /**
   * go to current step
   */
  goto(step) {
    this.step = step;
  }

  /**
   * click on input file
   *
   */
  changeFileInput() {
    this.$('#importExcelFileInput').click();
  }

  /**
   * click on input file
   *
   */
  changeFile(event) {
    this.resource.file = event.target.files[0];
    //
    console.log(event);
    Helper.setFile(event, 'file', this.resource);
  }

  /**
   * click on input file
   *
   */
  uploadFile() {
    if (!this.resource.file)
      return Message.error(Helper.trans("upload excel file"));

    let data = Helper.toFormData(this.data);
    this.isSubmitted = true;
    data.append("file", this.resource.file);


    this.excelService.upload(this.apiUrl, data).subscribe((r: any) => {
      if (r.status == 1) {
        Message.success(r.message);
        this.reset();
        if (this.action)
          this.action();
      }else
        Message.error(r.message);

      this.isSubmitted = false;
    });
  }

  ngOnInit() {
  }

}
