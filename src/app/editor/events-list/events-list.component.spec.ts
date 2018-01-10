import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListComponent } from './events-list.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('EventsListComponent', () => {
  let component: EventsListComponent;
  let fixture: ComponentFixture<EventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
