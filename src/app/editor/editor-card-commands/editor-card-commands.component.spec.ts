import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCardCommandsComponent } from './editor-card-commands.component';

describe('EditorCardCommandsComponent', () => {
  let component: EditorCardCommandsComponent;
  let fixture: ComponentFixture<EditorCardCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCardCommandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCardCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
