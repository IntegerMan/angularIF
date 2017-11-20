import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVerbHandlerDialogComponent } from './add-verb-handler-dialog.component';
import {TestingModule} from '../../testing/testing.module';

describe('AddVerbHandlerDialogComponent', () => {
  let component: AddVerbHandlerDialogComponent;
  let fixture: ComponentFixture<AddVerbHandlerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVerbHandlerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
