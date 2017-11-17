import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListComponent } from './navigation-list.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {EditorModule} from '../editor.module';

describe('NavigationListComponent', () => {
  let component: NavigationListComponent;
  let fixture: ComponentFixture<NavigationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
