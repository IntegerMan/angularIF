import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDebugComponent } from './token-debug.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('TokenDebugComponent', () => {
  let component: TokenDebugComponent;
  let fixture: ComponentFixture<TokenDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDebugComponent);
    component = fixture.componentInstance;
    component.token = TestDataProvider.buildCommandToken();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
