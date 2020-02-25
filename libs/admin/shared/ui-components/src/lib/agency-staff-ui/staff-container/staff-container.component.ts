import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { AgencyStaffVM } from '@hbx/admin/shared/view-models';
import { TerminationRequest } from '../../interfaces/terminationRequest';

@Component({
  selector: 'hbx-staff-container',
  templateUrl: './staff-container.component.html',
  styleUrls: ['./staff-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffContainerComponent {
  @Input() staff: AgencyStaffVM;

  @Output() terminateRole: EventEmitter<TerminationRequest> = new EventEmitter<
    TerminationRequest
  >();
}
