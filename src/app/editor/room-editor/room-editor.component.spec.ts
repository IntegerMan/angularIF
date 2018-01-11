import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditorComponent } from './room-editor.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('RoomEditorComponent', () => {
  let component: RoomEditorComponent;
  let fixture: ComponentFixture<RoomEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditorComponent);
    component = fixture.componentInstance;
    component.room = TestDataProvider.buildRoom();
    component.story = TestDataProvider.buildStoryData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
