import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySelectionComponent } from './story-selection.component';

describe('StorySelectionComponent', () => {
  let component: StorySelectionComponent;
  let fixture: ComponentFixture<StorySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorySelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
