import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryInfoEditorComponent } from './story-info-editor.component';

describe('StoryInfoEditorComponent', () => {
  let component: StoryInfoEditorComponent;
  let fixture: ComponentFixture<StoryInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryInfoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
