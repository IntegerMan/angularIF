import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPresenterComponent } from './markdown-presenter.component';

describe('MarkdownPresenterComponent', () => {
  let component: MarkdownPresenterComponent;
  let fixture: ComponentFixture<MarkdownPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
