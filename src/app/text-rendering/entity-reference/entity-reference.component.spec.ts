import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityReferenceComponent } from './entity-reference.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('EntityReferenceComponent', () => {
  let component: EntityReferenceComponent;
  let fixture: ComponentFixture<EntityReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityReferenceComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildGameRoom();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
