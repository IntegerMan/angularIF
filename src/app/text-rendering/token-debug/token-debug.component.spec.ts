import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDebugComponent } from './token-debug.component';

describe('TokenDebugComponent', () => {
  let component: TokenDebugComponent;
  let fixture: ComponentFixture<TokenDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
