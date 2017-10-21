import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateHeaderComponent } from './game-state-header.component';

describe('GameStateHeaderComponent', () => {
  let component: GameStateHeaderComponent;
  let fixture: ComponentFixture<GameStateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
