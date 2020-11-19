import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {EmployeeService} from '../../service/employee.service';
import {NotiService} from '../../service/notification.service';

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
              private employeeService: EmployeeService,
  ) { }
  form: FormGroup
  submitted = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
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
    if (this.selectedItem) {
      console.log(this.selectedItem)
      const put = {
        id: this.form.get('id').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        name: this.form.get('name').value,
        luong: this.form.get('luong').value
      }
      this.employeeService.updateEmployee(put,this.selectedItem.id).toPromise().then(res => {
          this.activeModal.close('update');
        // this.notiService.showNoti('Cập nhật thành công', 'success');
        },
      )
    } else {
      this.employeeService.createUserWithAccount(this.form.value).subscribe(() => {
        this.activeModal.close('create');
        // this.notiService.showNoti('Thêm mới thành công', 'success');
      })
    }
  }
}
