import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHostComponent } from './editor-host.component';

describe('EditorHostComponent', () => {
  let component: EditorHostComponent;
  let fixture: ComponentFixture<EditorHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
