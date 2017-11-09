import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliasesListComponent } from './aliases-list.component';

describe('AliasesListComponent', () => {
  let component: AliasesListComponent;
  let fixture: ComponentFixture<AliasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
