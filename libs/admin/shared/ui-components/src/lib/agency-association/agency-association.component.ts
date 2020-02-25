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
} from '@hbx/admin/shared/view-models';

import { TerminationRequest } from '../interfaces/terminationRequest';

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
  @Input() agencyStaff: AgencyStaffVM;

  @Output() terminateRole: EventEmitter<TerminationRequest> = new EventEmitter<
    TerminationRequest
  >();

  terminateAgencyRole(): void {
    this.terminateRole.emit({
      agencyProfileId: this.role.agencyProfileId,
      agencyStaffId: this.agencyStaff.personId,
    });
  }
}
