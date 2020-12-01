import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'kt-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  @Input() selectedItem: any;
  constructor(public _NgbActiveModal: NgbActiveModal,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }
  onSubmit() {
    this.employeeService.deleteEmployeeById(this.selectedItem.id).subscribe(()=> {
      this.activeModal.close('delete');
    })
  }
}
