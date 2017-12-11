import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationEditorComponent } from './navigation-editor.component';
import {EditorModule} from '../editor.module';
import {TestingModule} from '../../testing/testing.module';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('NavigationEditorComponent', () => {
  let component: NavigationEditorComponent;
  let fixture: ComponentFixture<NavigationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorComponent);
    component = fixture.componentInstance;
    component.dir = TestDataProvider.buildDirectionData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
