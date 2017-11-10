import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorEditorComponent } from './actor-editor.component';

describe('ActorEditorComponent', () => {
  let component: ActorEditorComponent;
  let fixture: ComponentFixture<ActorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
