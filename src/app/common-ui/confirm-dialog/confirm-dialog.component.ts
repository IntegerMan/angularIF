import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmTask} from '../confirm-task';
import {AddAliasDialogComponent} from '../../editor/dialogs/add-alias-dialog/add-alias-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'if-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  task: ConfirmTask;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = data;
  }

  ngOnInit() {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
