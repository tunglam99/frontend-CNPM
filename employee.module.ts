import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: '**', redirectTo: 'employee', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmployeeModule { }
