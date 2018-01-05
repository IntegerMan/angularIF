import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputComponent } from './user-input.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    component.text = 'This is a test';
    component.command = TestDataProvider.buildCommand();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
