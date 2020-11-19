import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeComponent} from './employee.component';
import {RouterModule, Routes} from '@angular/router';
import {PartialsModule} from '../../partials/partials.module';
import { ModalAddEditComponent } from './modal-add-edit/modal-add-edit.component';
import {NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [ModalAddEditComponent, ModalDeleteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PartialsModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbTooltipModule
  ],
  entryComponents: [
    ModalAddEditComponent,
    ModalDeleteComponent
  ]
})
export class EmployeeModule { }
