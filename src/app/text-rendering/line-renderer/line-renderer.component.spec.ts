import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRendererComponent } from './line-renderer.component';
import {TextLine} from '../text-line';
import {RenderType} from '../render-type.enum';
import {TestingModule} from '../../testing/testing.module';

describe('LineRendererComponent', () => {
  let component: LineRendererComponent;
  let fixture: ComponentFixture<LineRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRendererComponent);
    component = fixture.componentInstance;
    component.line = new TextLine('Test', RenderType.helpText, 'This is just help text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
