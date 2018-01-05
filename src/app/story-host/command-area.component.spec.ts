import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAreaComponent } from './command-area.component';
import {TestingModule} from '../testing/testing.module';

describe('CommandAreaComponent', () => {
  let component: CommandAreaComponent;
  let fixture: ComponentFixture<CommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
