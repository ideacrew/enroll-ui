import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { AgencyStaffVM, AgencyRoleVM } from '@hbx/admin/shared/view-models';
import { RoleChangeRequest } from '@hbx/api-interfaces';

@Component({
  selector: 'hbx-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffContainerComponent {
  @Input() staff: AgencyStaffVM;
  @Input() canManage: boolean;

  @Output() readonly terminateRole: EventEmitter<
    RoleChangeRequest
  > = new EventEmitter<RoleChangeRequest>();

  trackByRoleId(index: number, role: AgencyRoleVM): string {
    return role.roleId;
  }
}
