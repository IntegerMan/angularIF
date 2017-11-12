import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliasDialogComponent } from './add-alias-dialog.component';

describe('AddAliasDialogComponent', () => {
  let component: AddAliasDialogComponent;
  let fixture: ComponentFixture<AddAliasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAliasDialogComponent ]
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
