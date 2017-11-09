import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditorComponent } from './room-editor.component';

describe('RoomEditorComponent', () => {
  let component: RoomEditorComponent;
  let fixture: ComponentFixture<RoomEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
