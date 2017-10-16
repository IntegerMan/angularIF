import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRendererComponent } from './line-renderer.component';

describe('LineRendererComponent', () => {
  let component: LineRendererComponent;
  let fixture: ComponentFixture<LineRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
