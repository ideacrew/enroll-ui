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

export interface TerminationRequest {
  personId: string;
  agencyProfileId: string;
}

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
}
