import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListEditorComponent } from './room-list-editor.component';

describe('RoomListEditorComponent', () => {
  let component: RoomListEditorComponent;
  let fixture: ComponentFixture<RoomListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
