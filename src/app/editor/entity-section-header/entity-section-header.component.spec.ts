import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySectionHeaderComponent } from './entity-section-header.component';

describe('EntitySectionHeaderComponent', () => {
  let component: EntitySectionHeaderComponent;
  let fixture: ComponentFixture<EntitySectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
