import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasesListComponent } from './aliases-list.component';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {TestingModule} from '../../testing/testing.module';

describe('AliasesListComponent', () => {
  let component: AliasesListComponent;
  let fixture: ComponentFixture<AliasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasesListComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildActor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
