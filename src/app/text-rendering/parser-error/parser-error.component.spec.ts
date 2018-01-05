import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserErrorComponent } from './parser-error.component';
import {TestingModule} from '../../testing/testing.module';

describe('ParserErrorComponent', () => {
  let component: ParserErrorComponent;
  let fixture: ComponentFixture<ParserErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserErrorComponent);
    component = fixture.componentInstance;
    component.text = 'Dude, this failed';
    component.hint = 'Sucks to be you, bro.';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
