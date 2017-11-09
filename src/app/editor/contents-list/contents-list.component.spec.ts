import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsListComponent } from './contents-list.component';

describe('ContentsListComponent', () => {
  let component: ContentsListComponent;
  let fixture: ComponentFixture<ContentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
