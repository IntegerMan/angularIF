import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDebugComponent } from './entity-debug.component';

describe('EntityDebugComponent', () => {
  let component: EntityDebugComponent;
  let fixture: ComponentFixture<EntityDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
