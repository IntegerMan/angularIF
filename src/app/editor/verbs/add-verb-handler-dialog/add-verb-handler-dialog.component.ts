import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'if-add-verb-handler-dialog',
  templateUrl: './add-verb-handler-dialog.component.html',
  styleUrls: ['./add-verb-handler-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVerbHandlerDialogComponent implements OnInit {

  verb: string = 'look';

  constructor(public dialogRef: MatDialogRef<AddVerbHandlerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  confirmSelection() {
    this.onEnterPressed(this.verb);
  }

  onEnterPressed(name: String) {
    this.dialogRef.close(name);
  }

}
