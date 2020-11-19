import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'kt-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {
  @Input() title: any;
  @Input() selectedItem: any;
  constructor(private _NgbActiveModal: NgbActiveModal,
              private fb: FormBuilder,
              private employeeService: EmployeeService) { }
  form: FormGroup
  submitted = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.maxLength(250), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      luong: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    })
    if (this.selectedItem) {
      this.form.get('email').setValue(this.selectedItem.email);
      this.form.get('password').setValue(this.selectedItem.password);
      this.form.get('name').setValue(this.selectedItem.name);
      this.form.get('luong').setValue(this.selectedItem.luong);
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  get f() {
    return this.form.controls;
  }

  trimSpace(formName: string) {
    if (formName) {
      this.form.get(formName).setValue(
        this.form.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.employeeService.createUserWithAccount(this.form.value).subscribe(() =>{
      this.activeModal.close('create');
    })
  }
}
