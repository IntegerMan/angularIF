import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorImportComponent } from './editor-import.component';

describe('EditorImportComponent', () => {
  let component: EditorImportComponent;
  let fixture: ComponentFixture<EditorImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
