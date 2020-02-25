import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { AgencyStaffVM } from '@hbx/admin/shared/view-models';
import { RoleChangeRequest } from '@hbx/api-interfaces';

@Component({
  selector: 'hbx-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffContainerComponent {
  @Input() staff: AgencyStaffVM;

  @Output() terminateRole: EventEmitter<RoleChangeRequest> = new EventEmitter<
    RoleChangeRequest
  >();
}
