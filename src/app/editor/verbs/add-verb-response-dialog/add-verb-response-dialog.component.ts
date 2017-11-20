import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'if-add-verb-response-dialog',
  templateUrl: './add-verb-response-dialog.component.html',
  styleUrls: ['./add-verb-response-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVerbResponseDialogComponent implements OnInit {

  @Input()
  responseType: string = 'story';

  @Input()
  value: string = '';

  isEdit: boolean = false;
  header: string = 'Add Response';
  okText: string = 'Add';

  constructor(public dialogRef: MatDialogRef<AddVerbResponseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data) {
      this.isEdit = true;
      this.header = 'Edit Response';
      this.okText = 'Save';

      if (data.type) {
        this.responseType = data.type;
      }
      if (data.value) {
        this.value = data.value;
      }
    }
  }

  ngOnInit() {
  }

  confirmSelection() {
    this.onEnterPressed(this.responseType, this.value);
  }

  onEnterPressed(responseType: String, value: String) {

    const response: any = {type: responseType, value: value};

    this.dialogRef.close(response);
  }
}
