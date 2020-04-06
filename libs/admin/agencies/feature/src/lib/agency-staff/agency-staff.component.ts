import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import {
  map,
  debounceTime,
  startWith,
  distinctUntilChanged,
} from 'rxjs/operators';

import { AgencyStaffVM } from '@hbx/admin/shared/view-models';
import { RoleChangeRequest } from '@hbx/api-interfaces';
import { PermissionsService, HbxPermissions } from '@hbx/user/permissions';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import { searchAgencyStaff } from '../utils';
import * as AgencyStaffActions from '../state/agency-staff/agency-staff.actions';
import { AgenciesFacade } from '../state/agencies/agencies.facade';
import { PrimaryAgentsFacade } from '../state/primary-agents/primary-agents.facade';
import { filterRoleStatus } from '../utils/filterRoleStatus';

interface AgencyStaffListVM {
  agencyStaff: AgencyStaffVM[];
  loaded: boolean;
  status: string;
}

@Component({
  templateUrl: './agency-staff.component.html',
  styleUrls: ['./agency-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffComponent implements OnInit {
  HbxPermissions = HbxPermissions;
  globalSearch: FormControl = new FormControl();

  globalSearch$: Observable<string> = this.globalSearch.valueChanges.pipe(
    debounceTime(200),
    map((query: string) => query.trim().toLowerCase())
  );

  statusFilter$: Observable<string> = this.route.queryParams.pipe(
    map((params: Params) => params['status'] || 'all')
  );

  entitiesLoaded$: Observable<boolean> = combineLatest([
    this.agencyStaffFacade.loaded$,
    this.agenciesFacade.loaded$,
    this.primaryStaffFacade.loaded$,
  ]).pipe(
    map(
      ([agencyStaffLoaded, agenciesLoaded, primaryStaffLoaded]: [
        boolean,
        boolean,
        boolean
      ]) => agencyStaffLoaded && agenciesLoaded && primaryStaffLoaded
    )
  );

  staffFilteredByStatus$: Observable<AgencyStaffVM[]> = combineLatest([
    this.statusFilter$,
    this.agencyStaffFacade.allAgencyStaff$,
  ]).pipe(
    map(([status, agencyStaff]: [string, AgencyStaffVM[]]) =>
      filterRoleStatus(status, agencyStaff)
    )
  );

  staffFilteredBySearch$: Observable<AgencyStaffVM[]> = combineLatest([
    this.globalSearch$.pipe(startWith('')),
    this.staffFilteredByStatus$,
  ]).pipe(
    distinctUntilChanged(),
    map(([searchQuery, agencyStaffVMs]: [string, AgencyStaffVM[]]) => {
      return searchAgencyStaff(searchQuery, agencyStaffVMs);
    })
  );

  agencyStaffVM$: Observable<AgencyStaffListVM> = combineLatest([
    this.statusFilter$,
    this.staffFilteredBySearch$,
    this.entitiesLoaded$,
  ]).pipe(
    distinctUntilChanged(),
    map(
      ([status, agencyStaffVMs, entitiesLoaded]: [
        string,
        AgencyStaffVM[],
        boolean
      ]) => {
        return {
          status,
          agencyStaff: agencyStaffVMs,
          loaded: entitiesLoaded,
        };
      }
    )
  );

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private agenciesFacade: AgenciesFacade,
    private primaryStaffFacade: PrimaryAgentsFacade,
    public permissionsService: PermissionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.clearCurrentlySelectedAgent()
    );
  }

  terminateAgencyRole(request: RoleChangeRequest): void {
    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.terminateAgencyRole({ request })
    );
  }
}
