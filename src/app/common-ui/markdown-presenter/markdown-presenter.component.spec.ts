import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPresenterComponent } from './markdown-presenter.component';
import {MarkdownService} from '../../text-rendering/markdown.service';

describe('MarkdownPresenterComponent', () => {
  let component: MarkdownPresenterComponent;
  let fixture: ComponentFixture<MarkdownPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ MarkdownService ],
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
