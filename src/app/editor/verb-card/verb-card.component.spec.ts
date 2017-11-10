import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbCardComponent } from './verb-card.component';

describe('VerbCardComponent', () => {
  let component: VerbCardComponent;
  let fixture: ComponentFixture<VerbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
