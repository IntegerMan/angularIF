import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DirectionData} from '../../../engine/story-data/direction-data';

@Component({
  selector: 'if-add-navigation-dialog',
  templateUrl: './add-navigation-dialog.component.html',
  styleUrls: ['./add-navigation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNavigationDialogComponent implements OnInit {

  direction: DirectionData;
  addOrEdit: string;

  constructor(public dialogRef: MatDialogRef<AddNavigationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data) {
      this.direction = data;
      this.addOrEdit = 'Edit';
    } else {
      this.direction = new DirectionData();
      this.addOrEdit = 'Add';
    }

  }

  ngOnInit(): void {

  }

  confirmSelection() {
    this.onEnterPressed();
  }

  onEnterPressed() {
    this.dialogRef.close(this.direction);
  }
}
