import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityReferenceComponent } from './entity-reference.component';

describe('EntityReferenceComponent', () => {
  let component: EntityReferenceComponent;
  let fixture: ComponentFixture<EntityReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
