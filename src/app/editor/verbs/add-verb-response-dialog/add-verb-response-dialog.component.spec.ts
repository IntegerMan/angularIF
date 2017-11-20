import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVerbResponseDialogComponent } from './add-verb-response-dialog.component';
import {TestingModule} from '../../../testing/testing.module';

describe('AddVerbResponseDialogComponent', () => {
  let component: AddVerbResponseDialogComponent;
  let fixture: ComponentFixture<AddVerbResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVerbResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
