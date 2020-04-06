import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  AgencyRoleVM,
  AgencyStaffVM,
  AgencyType,
  AgencyStaffDetailVM,
} from '@hbx/admin/shared/view-models';
import { RoleChangeRequest, AgencyRoleState } from '@hbx/api-interfaces';

@Component({
  selector: 'hbx-agency-association',
  templateUrl: './agency-association.component.html',
  styleUrls: ['./agency-association.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAssociationComponent {
  AgencyType = AgencyType;
  editing = false;

  @Input() role: AgencyRoleVM;
  @Input() agencyStaff: AgencyStaffVM | AgencyStaffDetailVM;
  @Input() canManage: boolean;

  @Output() terminateRole: EventEmitter<RoleChangeRequest> = new EventEmitter<
    RoleChangeRequest
  >();

  terminateAgencyRole(): void {
    this.terminateRole.emit({
      agencyRoleId: this.role.roleId,
      agencyStaffId: this.agencyStaff.personId,
      from: this.role.currentState,
      to: AgencyRoleState.Terminated,
    });
  }
}
