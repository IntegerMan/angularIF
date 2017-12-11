import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavigationDialogComponent } from './add-navigation-dialog.component';
import {TestingModule} from '../../../testing/testing.module';
import {TestDataProvider} from '../../../engine/story-data/test-data-provider';

describe('AddNavigationDialogComponent', () => {
  let component: AddNavigationDialogComponent;
  let fixture: ComponentFixture<AddNavigationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNavigationDialogComponent);
    component = fixture.componentInstance;
    component.direction = TestDataProvider.buildDirectionData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
