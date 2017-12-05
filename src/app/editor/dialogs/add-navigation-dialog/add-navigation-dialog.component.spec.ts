import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavigationDialogComponent } from './add-navigation-dialog.component';

describe('AddNavigationDialogComponent', () => {
  let component: AddNavigationDialogComponent;
  let fixture: ComponentFixture<AddNavigationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNavigationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNavigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
