import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEditorComponent } from './navigation-editor.component';

describe('NavigationEditorComponent', () => {
  let component: NavigationEditorComponent;
  let fixture: ComponentFixture<NavigationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
