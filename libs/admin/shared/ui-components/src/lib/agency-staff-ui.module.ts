import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StaffContainerComponent } from './staff-container/staff-container.component';
import { AgencyAssociationComponent } from './agency-association/agency-association.component';
import { AgencyStaffSkeletonComponent } from './agency-staff-skeleton/agency-staff-skeleton.component';

@NgModule({
  declarations: [
    StaffContainerComponent,
    AgencyAssociationComponent,
    AgencyStaffSkeletonComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    StaffContainerComponent,
    AgencyAssociationComponent,
    AgencyStaffSkeletonComponent,
  ],
})
export class AgencyStaffUiModule {}
