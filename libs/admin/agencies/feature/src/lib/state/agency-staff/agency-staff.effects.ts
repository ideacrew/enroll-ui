import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

import {
  RoleChangeRequest,
  DemographicsUpdate,
  AgentEmail,
  EmailKind,
  ApiError,
} from '@hbx/api-interfaces';
import { AgenciesApiService } from '@hbx/admin/agencies/data-access';
import { addToast, ToastType } from '@hbx/shared/notifications/toasts';

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
        e: ApiError
      ) => AgencyStaffActions.loadAgencyStaffFailure({ errorResponse: e }),
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
      onError: (a: ActivatedRouteSnapshot, e: any) =>
        AgencyStaffActions.loadAgencyStaffDetailFailure({ errorResponse: e }),
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
          return (
            this.agenciesApiService
              .terminateAgencyRole(action.request)
              // tslint:disable-next-line: no-unnecessary-callback-wrapper
              .pipe(switchMap(() => of<any>()))
          );
        },
        undoAction: (
          action: ReturnType<typeof AgencyStaffActions.terminateAgencyRole>,
          e: ApiError
        ) => {
          const { from, to } = action.request;

          // Switch to and from in the change request
          const undoRequest: RoleChangeRequest = {
            ...action.request,
            from: to,
            to: from,
          };

          return AgencyStaffActions.terminateAgencyRoleFailure({
            request: undoRequest,
            errorResponse: e,
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
          return (
            this.agenciesApiService
              .terminateAgencyRole(action.request)
              // tslint:disable-next-line: deprecation
              // tslint:disable-next-line: no-unnecessary-callback-wrapper
              .pipe(switchMap(() => of<any>()))
          );
        },
        undoAction: (
          action: ReturnType<
            typeof AgencyStaffActions.terminateAgencyRoleDetailPage
          >,
          e: ApiError
        ) => {
          const { from, to } = action.request;

          // Switch to and from in the change request
          const undoRequest: RoleChangeRequest = {
            ...action.request,
            from: to,
            to: from,
          };

          return AgencyStaffActions.terminateAgencyRoleDetailPageFailure({
            request: undoRequest,
            errorResponse: e,
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

          return (
            this.agenciesApiService
              .updateStaffDemographics(agencyStaff.personId, update)
              // tslint:disable-next-line: no-unnecessary-callback-wrapper
              .pipe(switchMap(() => of<any>()))
          );
        },
        undoAction: (
          action: ReturnType<typeof AgencyStaffActions.updateStaffDemographics>,
          errorResponse: ApiError
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
            errorResponse,
          });
        },
      }
    )
  );

  updateEmail$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(AgencyStaffActions.updateStaffEmail, {
      run: (action: ReturnType<typeof AgencyStaffActions.updateStaffEmail>) => {
        const { agencyStaff, newEmails: update } = action;

        return (
          this.agenciesApiService
            .updateStaffEmail(agencyStaff.personId, update)
            // tslint:disable-next-line: no-unnecessary-callback-wrapper
            .pipe(switchMap(() => of<any>()))
        );
      },
      undoAction: (
        action: ReturnType<typeof AgencyStaffActions.updateStaffEmail>,
        error: ApiError
      ) => {
        const { agencyStaff } = action;

        const update: AgentEmail[] = agencyStaff.email.map(email => {
          return {
            address: email.address,
            kind: EmailKind.Work,
            id: email.id,
          };
        });

        return AgencyStaffActions.updateStaffEmailFailure({
          agencyStaff,
          newEmails: update,
          errorResponse: error,
        });
      },
    })
  );

  updateDemographicsErrorNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgencyStaffActions.updateStaffDemographicsFailure),
      map(({ errorResponse }) =>
        addToast({
          request: {
            heading: 'Update staff failed',
            message: errorResponse.error.message,
            type: ToastType.Error,
          },
        })
      )
    )
  );

  updateEmailErrorNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgencyStaffActions.updateStaffEmailFailure),
      map(({ errorResponse }) =>
        addToast({
          request: {
            heading: 'Update email failed',
            message: errorResponse.error.message,
            type: ToastType.Error,
          },
        })
      )
    )
  );

  terminateRoleErrorNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AgencyStaffActions.terminateAgencyRoleDetailPageFailure,
        AgencyStaffActions.terminateAgencyRoleFailure
      ),
      map(({ errorResponse }) =>
        addToast({
          request: {
            heading: 'Terminate role failed',
            message: errorResponse.error.message,
            type: ToastType.Error,
          },
        })
      )
    )
  );

  constructor(
    private dataPersistence: DataPersistence<
      fromAgencyStaff.AgencyStaffPartialState
    >,
    private agenciesApiService: AgenciesApiService,
    private actions$: Actions
  ) {}
}
