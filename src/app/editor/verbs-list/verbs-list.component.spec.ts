import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbsListComponent } from './verbs-list.component';

describe('VerbsListComponent', () => {
  let component: VerbsListComponent;
  let fixture: ComponentFixture<VerbsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
