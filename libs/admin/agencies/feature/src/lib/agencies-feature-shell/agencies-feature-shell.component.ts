import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PermissionsService, HbxPermissions } from '@hbx/user/permissions';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import { AgenciesFacade } from '../state/agencies/agencies.facade';
import * as AgencyStaffActions from '../state/agency-staff/agency-staff.actions';
import * as AgenciesActions from '../state/agencies/agencies.actions';
import * as PrimaryAgentsActions from '../state/primary-agents/primary-agents.actions';
import { PrimaryAgentsFacade } from '../state/primary-agents/primary-agents.facade';

@Component({
  selector: 'hbx-agencies-feature-shell',
  templateUrl: './agencies-feature-shell.component.html',
  styleUrls: ['./agencies-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesFeatureShellComponent implements OnInit {
  HbxPermissions = HbxPermissions;

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private agenciesFacade: AgenciesFacade,
    private primaryAgentsFacade: PrimaryAgentsFacade,
    public permissionsService: PermissionsService
  ) {}

  ngOnInit() {
    this.agencyStaffFacade.dispatch(AgencyStaffActions.loadAgencyStaff());
    this.agenciesFacade.dispatch(AgenciesActions.loadAgencies());
    this.primaryAgentsFacade.dispatch(PrimaryAgentsActions.loadPrimaryAgents());
  }
}
