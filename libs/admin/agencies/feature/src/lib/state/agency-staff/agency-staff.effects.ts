import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AgenciesApiService } from '@hbx/admin/agencies/data-access';

import * as fromAgencyStaff from './agency-staff.reducer';
import * as AgencyStaffActions from './agency-staff.actions';
import { RoleChangeRequest } from '@hbx/api-interfaces';
import { AgencyStaffDetailComponent } from '../../agency-staff-detail/agency-staff-detail.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AgencyStaffEffects {
  loadAgencyStaff$ = createEffect(() =>
    this.dataPersistence.fetch(AgencyStaffActions.loadAgencyStaff, {
      run: (
        _action: ReturnType<typeof AgencyStaffActions.loadAgencyStaff>,
        _state: fromAgencyStaff.AgencyStaffPartialState
      ) => {
        return this.agenciesApiService
          .getAllAgencyStaff()
          .pipe(
            map(agencyStaff =>
              AgencyStaffActions.loadAgencyStaffSuccess({ agencyStaff })
            )
          );
      },
      onError: (
        _action: ReturnType<typeof AgencyStaffActions.loadAgencyStaff>,
        error: any
      ) => {
        console.error('Error', error);
        return AgencyStaffActions.loadAgencyStaffFailure({ error });
      },
    })
  );

  loadAgencyStaffDetail$ = createEffect(() =>
    this.dataPersistence.navigation(AgencyStaffDetailComponent, {
      run: (a: ActivatedRouteSnapshot) => {
        const personId = a.paramMap.get('personId');

        return this.agenciesApiService
          .getStaffDetail(personId)
          .pipe(
            map(agencyStaff =>
              AgencyStaffActions.loadAgencyStaffDetailSuccess({ agencyStaff })
            )
          );
      },
      onError: (a: ActivatedRouteSnapshot, error: any) => {
        console.error('Error', error);
        return AgencyStaffActions.loadAgencyStaffDetailFailure({ error });
      },
    })
  );

  terminateAgentRole$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(AgencyStaffActions.changeAgencyRole, {
      run: (
        action: ReturnType<typeof AgencyStaffActions.changeAgencyRole>,
        _state
      ) => {
        return this.agenciesApiService
          .terminateAgencyRole(action.request)
          .pipe(switchMap(() => of<any>()));
      },
      undoAction: (
        action: ReturnType<typeof AgencyStaffActions.changeAgencyRole>,
        _state
      ) => {
        console.log('UNDOING ROLE TERMINATION');
        const { from, to } = action.request;

        // Switch to and from in the change request
        const undoRequest: RoleChangeRequest = {
          ...action.request,
          from: to,
          to: from,
        };

        return AgencyStaffActions.changeAgencyRoleFailure({
          request: undoRequest,
        });
      },
    })
  );

  constructor(
    private dataPersistence: DataPersistence<
      fromAgencyStaff.AgencyStaffPartialState
    >,
    private agenciesApiService: AgenciesApiService
  ) {}
}
