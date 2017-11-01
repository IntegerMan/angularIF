import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHostComponent } from './story-host.component';

describe('StoryHostComponent', () => {
  let component: StoryHostComponent;
  let fixture: ComponentFixture<StoryHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
