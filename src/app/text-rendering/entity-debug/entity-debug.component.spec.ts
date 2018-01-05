import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDebugComponent } from './entity-debug.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('EntityDebugComponent', () => {
  let component: EntityDebugComponent;
  let fixture: ComponentFixture<EntityDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDebugComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildGameRoom();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
