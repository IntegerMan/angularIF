import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCommandAreaComponent } from './parser-command-area.component';
import {TestingModule} from '../testing/testing.module';

describe('ParserCommandAreaComponent', () => {
  let component: ParserCommandAreaComponent;
  let fixture: ComponentFixture<ParserCommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserCommandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
