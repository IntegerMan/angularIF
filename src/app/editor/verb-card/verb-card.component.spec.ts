import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbCardComponent } from './verb-card.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('VerbCardComponent', () => {
  let component: VerbCardComponent;
  let fixture: ComponentFixture<VerbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbCardComponent);
    component = fixture.componentInstance;
    component.verb = TestDataProvider.buildVerb();
    component.entity = TestDataProvider.buildItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
