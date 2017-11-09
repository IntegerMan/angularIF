import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListComponent } from './navigation-list.component';

describe('NavigationListComponent', () => {
  let component: NavigationListComponent;
  let fixture: ComponentFixture<NavigationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
