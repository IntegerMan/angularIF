import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbEditorComponent } from './verb-editor.component';
import {TestingModule} from '../../../testing/testing.module';
import {TestDataProvider} from '../../../engine/story-data/test-data-provider';

describe('VerbEditorComponent', () => {
  let component: VerbEditorComponent;
  let fixture: ComponentFixture<VerbEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbEditorComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildItem();
    component.verb = TestDataProvider.buildVerb();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
