import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHostComponent } from './story-host.component';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NaturalLanguageProcessor} from '../engine/parser/natural-language-processor';
import {TestingModule} from '../testing/testing.module';

describe('StoryHostComponent', () => {
  let component: StoryHostComponent;
  let fixture: ComponentFixture<StoryHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHostComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory(new NaturalLanguageProcessor());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
