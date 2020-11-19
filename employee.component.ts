import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/employee';
import {BehaviorSubject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAddEditComponent} from './modal-add-edit/modal-add-edit.component';
@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isCollapsed = true;
  public form: FormGroup;
  ADD = 'ADD';
  dataKT: Employee[];
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _pageSize: 10;
  skip: 0;
  public pageSizes: Array<number> = [5,10,20];
  constructor(private employeeService: EmployeeService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employeeService.getEmployee().subscribe((data) =>{
      this.dataKT = data
      console.log(this.dataKT);
      this.isLoading$.next(true);
    })
  }
  openModalAdd() {
    const modalRef = this.modal.open(ModalAddEditComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.ADD;
    modalRef.componentInstance.title = 'Thêm mới nhân viên'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.loadData();
      }
    }).catch(error => error)
  }
}
