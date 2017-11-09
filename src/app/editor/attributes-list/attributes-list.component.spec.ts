import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesListComponent } from './attributes-list.component';

describe('AttributesListComponent', () => {
  let component: AttributesListComponent;
  let fixture: ComponentFixture<AttributesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
