import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListComponent } from './text-list.component';

describe('TextListComponent', () => {
  let component: TextListComponent;
  let fixture: ComponentFixture<TextListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
