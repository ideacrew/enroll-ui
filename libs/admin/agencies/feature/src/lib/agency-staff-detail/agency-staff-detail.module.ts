import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AgencyStaffUiModule } from '@hbx/admin/shared/ui-components';

import { AgencyStaffDetailComponent } from './agency-staff-detail.component';

const routes: Routes = [{ path: '', component: AgencyStaffDetailComponent }];

@NgModule({
  declarations: [AgencyStaffDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgencyStaffUiModule,
  ],
})
export class AgencyStaffDetailModule {}
