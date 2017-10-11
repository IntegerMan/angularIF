import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCommandAreaComponent } from './tag-command-area.component';

describe('TagCommandAreaComponent', () => {
  let component: TagCommandAreaComponent;
  let fixture: ComponentFixture<TagCommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCommandAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCommandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
