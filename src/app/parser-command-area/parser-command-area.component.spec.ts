import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCommandAreaComponent } from './parser-command-area.component';

describe('ParserCommandAreaComponent', () => {
  let component: ParserCommandAreaComponent;
  let fixture: ComponentFixture<ParserCommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserCommandAreaComponent ]
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
