import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySelectionComponent } from './story-selection.component';
import {TestingModule} from '../testing/testing.module';
import {TestDataProvider} from '../engine/story-data/test-data-provider';

describe('StorySelectionComponent', () => {
  let component: StorySelectionComponent;
  let fixture: ComponentFixture<StorySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorySelectionComponent);
    component = fixture.componentInstance;
    component.stories = TestDataProvider.buildStories();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
