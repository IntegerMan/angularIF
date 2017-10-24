import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserErrorComponent } from './parser-error.component';

describe('ParserErrorComponent', () => {
  let component: ParserErrorComponent;
  let fixture: ComponentFixture<ParserErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
