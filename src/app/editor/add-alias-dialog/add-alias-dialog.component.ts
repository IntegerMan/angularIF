import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'if-add-alias-dialog',
  templateUrl: './add-alias-dialog.component.html',
  styleUrls: ['./add-alias-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAliasDialogComponent implements OnInit {

  alias: string;

  constructor(public dialogRef: MatDialogRef<AddAliasDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  confirmSelection() {
    this.onEnterPressed(this.alias);
  }

  onEnterPressed(name: String) {
    this.dialogRef.close(name);
  }

}
