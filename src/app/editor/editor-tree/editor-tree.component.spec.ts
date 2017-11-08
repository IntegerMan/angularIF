import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTreeComponent } from './editor-tree.component';

describe('EditorTreeComponent', () => {
  let component: EditorTreeComponent;
  let fixture: ComponentFixture<EditorTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
