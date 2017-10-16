import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceDebugCardComponent } from './sentence-debug-card.component';

describe('SentenceDebugCardComponent', () => {
  let component: SentenceDebugCardComponent;
  let fixture: ComponentFixture<SentenceDebugCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentenceDebugCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceDebugCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
