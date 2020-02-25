import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  AgencyRoleVM,
  AgencyStaffVM,
  AgencyType,
} from '@hbx/admin/shared/view-models';

@Component({
  selector: 'hbx-agency-association',
  templateUrl: './agency-association.component.html',
  styleUrls: ['./agency-association.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAssociationComponent {
  @Input() role: AgencyRoleVM;
  @Input() agencyStaff: AgencyStaffVM;

  AgencyType = AgencyType;
}
