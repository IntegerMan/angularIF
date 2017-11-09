import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRendererComponent } from './editor-renderer.component';

describe('EditorRendererComponent', () => {
  let component: EditorRendererComponent;
  let fixture: ComponentFixture<EditorRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
