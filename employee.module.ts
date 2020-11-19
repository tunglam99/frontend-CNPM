import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {RouterModule, Routes} from '@angular/router';
import {PartialsModule} from '../../partials/partials.module';
import { ModalAddEditComponent } from './modal-add-edit/modal-add-edit.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [ModalAddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PartialsModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModalAddEditComponent
  ]
})
export class EmployeeModule { }
