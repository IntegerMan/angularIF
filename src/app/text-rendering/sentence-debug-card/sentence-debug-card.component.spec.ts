import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceDebugCardComponent } from './sentence-debug-card.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('SentenceDebugCardComponent', () => {
  let component: SentenceDebugCardComponent;
  let fixture: ComponentFixture<SentenceDebugCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceDebugCardComponent);
    component = fixture.componentInstance;
    component.command = TestDataProvider.buildCommand();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
