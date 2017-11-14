import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookRendererComponent } from './look-renderer.component';

describe('LookRendererComponent', () => {
  let component: LookRendererComponent;
  let fixture: ComponentFixture<LookRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
