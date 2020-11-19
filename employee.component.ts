import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/employee';
import {BehaviorSubject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAddEditComponent} from './modal-add-edit/modal-add-edit.component';
import {ModalDeleteComponent} from './modal-delete/modal-delete.component';
import {GridComponent, PageChangeEvent} from '@progress/kendo-angular-grid';
@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isCollapsed = true;
  public form: FormGroup;
  ADD = 'ADD';
  UPDATE = 'UPDATE';
  dataKT: any;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
@ViewChild('table') table: GridComponent
  constructor(private employeeService: EmployeeService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }
  protected pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadData();
  }
  loadData() {
    this.employeeService.getEmployee().subscribe((data) =>{
      // this.dataKT = data
      // if(this.table !== undefined){
      //   this.table.data = data
      // }

      this.dataKT = {
        data: data.slice(this.skip, this.skip + this.pageSize),
        total: data.length
      };
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

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalAddEditComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.UPDATE;
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.componentInstance.title = 'Cập nhật nhân viên'
    modalRef.result.then(result => {
      if (result === 'update') {
        this.loadData();
      }
    }).catch(error => error)
  }

  openModalDelete($event: any, dataItem: any) {
    const modalRef = this.modal.open(ModalDeleteComponent);
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(result => {
      if (result === 'delete') {
        this.loadData();
      }
    }).catch(error => error)
  }
}
