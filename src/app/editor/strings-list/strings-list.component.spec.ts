import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsListComponent } from './strings-list.component';

describe('StringsListComponent', () => {
  let component: StringsListComponent;
  let fixture: ComponentFixture<StringsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
