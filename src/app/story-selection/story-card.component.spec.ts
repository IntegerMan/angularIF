import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCardComponent } from './story-card.component';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NaturalLanguageProcessor} from '../engine/parser/natural-language-processor';
import {TestingModule} from '../testing/testing.module';

describe('StoryCardComponent', () => {
  let component: StoryCardComponent;
  let fixture: ComponentFixture<StoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCardComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory(new NaturalLanguageProcessor());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
