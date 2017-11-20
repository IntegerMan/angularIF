import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbEditorComponent } from './verb-editor.component';

describe('VerbEditorComponent', () => {
  let component: VerbEditorComponent;
  let fixture: ComponentFixture<VerbEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
