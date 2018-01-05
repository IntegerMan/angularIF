import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateHeaderComponent } from './game-state-header.component';
import {TestingModule} from '../testing/testing.module';

describe('GameStateHeaderComponent', () => {
  let component: GameStateHeaderComponent;
  let fixture: ComponentFixture<GameStateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
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
