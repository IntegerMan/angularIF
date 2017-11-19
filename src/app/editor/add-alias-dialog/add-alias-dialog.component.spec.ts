import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliasDialogComponent } from './add-alias-dialog.component';
import {TestingModule} from '../../testing/testing.module';

describe('AddAliasDialogComponent', () => {
  let component: AddAliasDialogComponent;
  let fixture: ComponentFixture<AddAliasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAliasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
