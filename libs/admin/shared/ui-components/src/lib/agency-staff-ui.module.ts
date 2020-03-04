import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffContainerComponent } from './staff-container/staff-container.component';
import { AgencyAssociationComponent } from './agency-association/agency-association.component';
import { AgencyStaffSkeletonComponent } from './agency-staff-skeleton/agency-staff-skeleton.component';

@NgModule({
  declarations: [
    StaffContainerComponent,
    AgencyAssociationComponent,
    AgencyStaffSkeletonComponent,
  ],
  imports: [CommonModule],
  exports: [
    StaffContainerComponent,
    AgencyAssociationComponent,
    AgencyStaffSkeletonComponent,
  ],
})
export class AgencyStaffUiModule {}
