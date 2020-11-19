import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditComponent } from './modal-add-edit.component';

describe('ModalAddEditComponent', () => {
  let component: ModalAddEditComponent;
  let fixture: ComponentFixture<ModalAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
