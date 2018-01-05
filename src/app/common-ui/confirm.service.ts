import { Injectable } from '@angular/core';
import {ConfirmTask} from './confirm-task';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmService {

  constructor(private dialog: MatDialog) {

  }

  confirm(task: ConfirmTask): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: Object.assign({}, task)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task.accept) {
          task.accept();
        }
      } else {
        if (task.reject) {
          task.reject();
        }
      }
    });


  }

}
