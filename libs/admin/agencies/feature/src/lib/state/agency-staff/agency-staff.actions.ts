import { createAction, props } from '@ngrx/store';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyStaffWithDetail,
} from '@hbx/api-interfaces';

export const loadAgencyStaff = createAction('[Agency Staff] Load AgencyStaff');

export const loadAgencyStaffSuccess = createAction(
  '[Agency Staff] Load Agency Staff Success',
  props<{
    agencyStaff: AgencyStaff[];
  }>()
);

export const loadAgencyStaffFailure = createAction(
  '[Agency Staff] Load Agency Staff Failure',
  props<{ error: any }>()
);

export const terminateAgencyRole = createAction(
  '[Agency Staff List] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleFailure = createAction(
  '[Agency Staff List] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleDetailPage = createAction(
  '[Agency Staff Detail] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleDetailPageFailure = createAction(
  '[Agency Staff Detail] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest }>()
);

export const clearCurrentlySelectedAgent = createAction(
  '[Agency Detail List] Clear Selected Agent'
);

export const loadAgencyStaffDetailSuccess = createAction(
  '[Agency Staff Detail] Load Agency Staff Detail Success',
  props<{ agencyStaff: AgencyStaffWithDetail }>()
);

export const loadAgencyStaffDetailFailure = createAction(
  '[Agency Staff Detail] Load Agency Staff Detail Failure',
  props<{ error: any }>()
);
