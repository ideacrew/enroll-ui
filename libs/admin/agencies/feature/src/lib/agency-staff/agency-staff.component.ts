import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
  map,
  debounceTime,
  startWith,
  distinctUntilChanged,
} from 'rxjs/operators';

import { AgencyStaffVM } from '@hbx/admin/shared/view-models';
import { RoleChangeRequest } from '@hbx/api-interfaces';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import { searchAgencyStaff } from '../utils';
import * as AgencyStaffActions from '../state/agency-staff/agency-staff.actions';
import { AgenciesFacade } from '../state/agencies/agencies.facade';
import { PrimaryAgentsFacade } from '../state/primary-agents/primary-agents.facade';

interface AgencyStaffListVM {
  agencyStaff: AgencyStaffVM[];
  loaded: boolean;
}

@Component({
  templateUrl: './agency-staff.component.html',
  styleUrls: ['./agency-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffComponent {
  globalSearch: FormControl = new FormControl();

  globalSearch$: Observable<string> = this.globalSearch.valueChanges.pipe(
    debounceTime(200),
    map((query: string) => query.trim().toLowerCase())
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

  filteredStaff$: Observable<AgencyStaffVM[]> = combineLatest([
    this.globalSearch$.pipe(startWith('')),
    this.agencyStaffFacade.allAgencyStaff$,
  ]).pipe(
    distinctUntilChanged(),
    map(([searchQuery, agencyStaffVMs]: [string, AgencyStaffVM[]]) => {
      return searchAgencyStaff(searchQuery, agencyStaffVMs);
    })
  );

  agencyStaffVM$: Observable<AgencyStaffListVM> = combineLatest([
    this.filteredStaff$,
    this.entitiesLoaded$,
  ]).pipe(
    distinctUntilChanged(),
    map(([agencyStaffVMs, entitiesLoaded]: [AgencyStaffVM[], boolean]) => {
      return {
        agencyStaff: agencyStaffVMs,
        loaded: entitiesLoaded,
      };
    })
  );

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private agenciesFacade: AgenciesFacade,
    private primaryStaffFacade: PrimaryAgentsFacade
  ) {}

  terminateAgencyRole(request: RoleChangeRequest): void {
    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.changeAgencyRole({ request })
    );
  }
}
