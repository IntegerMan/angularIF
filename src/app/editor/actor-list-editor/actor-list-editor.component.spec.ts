import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorListEditorComponent } from './actor-list-editor.component';

describe('ActorListEditorComponent', () => {
  let component: ActorListEditorComponent;
  let fixture: ComponentFixture<ActorListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
