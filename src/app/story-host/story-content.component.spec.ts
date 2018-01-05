import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryContentComponent } from './story-content.component';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NaturalLanguageProcessor} from '../engine/parser/natural-language-processor';
import {TestingModule} from '../testing/testing.module';

describe('StoryContentComponent', () => {
  let component: StoryContentComponent;
  let fixture: ComponentFixture<StoryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryContentComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory(new NaturalLanguageProcessor());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
