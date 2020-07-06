import { Component, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import {
  AgencyStaffDetailVM,
  ChangeHistory,
  AgencyRoleVM,
} from '@hbx/admin/shared/view-models';
import { RoleChangeRequest, AgencyRoleState } from '@hbx/api-interfaces';
import { PermissionsService, HbxPermissions } from '@hbx/user/permissions';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import * as AgencyStaffActions from '../state/agency-staff/agency-staff.actions';

interface DetailVM {
  agent: AgencyStaffDetailVM;
  loaded: boolean;
}

/* tslint:disable:template-cyclomatic-complexity */
/* tslint:disable:template-no-call-expression */
@Component({
  templateUrl: './agency-staff-detail.component.html',
  styleUrls: ['./agency-staff-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffDetailComponent {
  HbxPermissions = HbxPermissions;

  detailVM$: Observable<DetailVM> = combineLatest([
    this.agencyStaffFacade.loaded$,
    this.agencyStaffFacade.selectedAgencyStaff$,
  ]).pipe(
    map(([loaded, agent]: [boolean, AgencyStaffDetailVM]) => ({
      loaded,
      agent,
    })),
    filter(detailVM => detailVM.agent !== null)
  );

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    public permissionsService: PermissionsService
  ) {}

  terminateAgencyRole(request: RoleChangeRequest): void {
    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.terminateAgencyRoleDetailPage({ request })
    );
  }

  trackByChange(index: number, change: ChangeHistory<AgencyRoleState>): number {
    return change.changedAt.getTime();
  }

  trackByRole(index: number, role: AgencyRoleVM): string {
    return role.roleId;
  }
}
