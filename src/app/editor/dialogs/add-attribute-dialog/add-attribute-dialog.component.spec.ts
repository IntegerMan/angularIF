import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AddAttributeDialogComponent} from './add-attribute-dialog.component';
import {TestingModule} from '../../../testing/testing.module';


describe('AddAttributeDialogComponent', () => {
  let component: AddAttributeDialogComponent;
  let fixture: ComponentFixture<AddAttributeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
