import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAreaComponent } from './command-area.component';

describe('CommandAreaComponent', () => {
  let component: CommandAreaComponent;
  let fixture: ComponentFixture<CommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandAreaComponent ]
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
