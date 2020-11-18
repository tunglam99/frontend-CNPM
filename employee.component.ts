import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isCollapsed: boolean = true;
  public form: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
