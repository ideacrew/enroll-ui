import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

import {
  RoleChangeRequest,
  DemographicsUpdate,
  EmailUpdate,
} from '@hbx/api-interfaces';
import { AgenciesApiService } from '@hbx/admin/agencies/data-access';

import * as fromAgencyStaff from './agency-staff.reducer';
import * as AgencyStaffActions from './agency-staff.actions';
import { AgencyStaffDetailComponent } from '../../agency-staff-detail/agency-staff-detail.component';

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
    this.dataPersistence.optimisticUpdate(
      AgencyStaffActions.terminateAgencyRole,
      {
        run: (
          action: ReturnType<typeof AgencyStaffActions.terminateAgencyRole>,
          _state
        ) => {
          return this.agenciesApiService
            .terminateAgencyRole(action.request)
            .pipe(switchMap(() => of<any>()));
        },
        undoAction: (
          action: ReturnType<typeof AgencyStaffActions.terminateAgencyRole>,
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

          return AgencyStaffActions.terminateAgencyRoleFailure({
            request: undoRequest,
          });
        },
      }
    )
  );

  terminateAgentRoleDetailPage$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(
      AgencyStaffActions.terminateAgencyRoleDetailPage,
      {
        run: (
          action: ReturnType<
            typeof AgencyStaffActions.terminateAgencyRoleDetailPage
          >
        ) => {
          return this.agenciesApiService
            .terminateAgencyRole(action.request)
            .pipe(switchMap(() => of<any>()));
        },
        undoAction: (
          action: ReturnType<
            typeof AgencyStaffActions.terminateAgencyRoleDetailPage
          >
        ) => {
          console.log('UNDOING ROLE TERMINATION');
          const { from, to } = action.request;

          // Switch to and from in the change request
          const undoRequest: RoleChangeRequest = {
            ...action.request,
            from: to,
            to: from,
          };

          return AgencyStaffActions.terminateAgencyRoleDetailPageFailure({
            request: undoRequest,
          });
        },
      }
    )
  );

  updateStaffDemographics$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(
      AgencyStaffActions.updateStaffDemographics,
      {
        run: (
          action: ReturnType<typeof AgencyStaffActions.updateStaffDemographics>
        ) => {
          const { agencyStaff, update } = action;

          return this.agenciesApiService
            .updateStaffDemographics(agencyStaff.personId, update)
            .pipe(switchMap(() => of<any>()));
        },
        undoAction: (
          action: ReturnType<typeof AgencyStaffActions.updateStaffDemographics>
        ) => {
          const { agencyStaff } = action;

          const update: DemographicsUpdate = {
            first_name: agencyStaff.firstName,
            last_name: agencyStaff.lastName,
            dob: agencyStaff.dob.display.toISOString().slice(0, 10),
          };

          return AgencyStaffActions.updateStaffDemographicsFailure({
            agencyStaff,
            update,
          });
        },
      }
    )
  );

  updateEmail$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(AgencyStaffActions.updateStaffEmail, {
      run: (action: ReturnType<typeof AgencyStaffActions.updateStaffEmail>) => {
        const { agencyStaff, update } = action;

        return this.agenciesApiService
          .updateStaffEmail(agencyStaff.personId, update)
          .pipe(switchMap(() => of<any>()));
      },
      undoAction: (
        action: ReturnType<typeof AgencyStaffActions.updateStaffEmail>
      ) => {
        const { agencyStaff } = action;

        const update: EmailUpdate[] = agencyStaff.email.map(email => {
          return {
            address: email.address,
            id: email.id,
          };
        });

        return AgencyStaffActions.updateStaffEmailFailure({
          agencyStaff,
          update,
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
