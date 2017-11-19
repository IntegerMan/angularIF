import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'if-add-attribute-dialog-component',
  templateUrl: './add-attribute-dialog.component.html',
  styleUrls: ['./add-attribute-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAttributeDialogComponent implements OnInit {

  key: string;
  value: string;

  constructor(public dialogRef: MatDialogRef<AddAttributeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.key) {
      this.key = data.key;
    }
    if (data.value) {
      this.value = data.value;
    }

    console.warn('Bang. Opened Dialog');
  }

  ngOnInit() {
  }

  confirmSelection() {
    this.onEnterPressed(this.key, this.value);
  }

  onEnterPressed(key: String, value: String) {
    this.dialogRef.close({key: key, value: value});
  }
}
