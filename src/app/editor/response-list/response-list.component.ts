import { Error } from 'tslint/lib/error';
import { selector } from 'rxjs/operator/publish';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'if-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResponseListComponent implements OnInit, OnChanges {

  @Input()
  responses: any[];

  responseItems: any[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  public getItemType(item: any): string {

    console.log(item);

    const itemType = typeof (item);

    if (item && itemType === 'string') {
      return 'string';
    }

    if (itemType === 'object') {
      if (item.invoke) {
        return 'invoke';
      }
    }

    return itemType;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.responseItems.length = 0;

    if (this.responses && this.responses instanceof Array) {
      this.responseItems = this.responses;
    } else {
      this.responseItems.push(this.responses);
    }
  }

}
