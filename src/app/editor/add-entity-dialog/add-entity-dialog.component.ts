import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'if-new-entity-dialog',
  templateUrl: './add-entity-dialog.component.html',
  styleUrls: ['./add-entity-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEntityDialogComponent implements OnInit {

  entityType: string = 'entity';

  key: string;
  name: string;

  constructor(public dialogRef: MatDialogRef<AddEntityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.entityType) {
      this.entityType = data.entityType;
      if (data.key) {
        this.key = data.key;
      }
      if (data.name) {
        this.name = data.name;
      }
    }

  }

  ngOnInit() {
  }

  confirmSelection() {
    this.onEnterPressed(this.key, this.name);
  }

  onEnterPressed(key: String, name: String) {
    this.dialogRef.close({key: key, name: name});
  }
}
