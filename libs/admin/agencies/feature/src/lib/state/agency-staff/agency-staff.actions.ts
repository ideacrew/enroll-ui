import { createAction, props } from '@ngrx/store';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyStaffWithDetail,
} from '@hbx/api-interfaces';

export const loadAgencyStaff = createAction('[AgencyStaff] Load AgencyStaff');

export const loadAgencyStaffSuccess = createAction(
  '[AgencyStaff] Load Agency Staff Success',
  props<{
    agencyStaff: AgencyStaff[];
  }>()
);

export const loadAgencyStaffFailure = createAction(
  '[Agency Staff] Load Agency Staff Failure',
  props<{ error: any }>()
);

export const terminateAgencyRole = createAction(
  '[Agency Staff] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleFailure = createAction(
  '[Agency Staff] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleDetailPage = createAction(
  '[Agency Detail] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleDetailPageFailure = createAction(
  '[Agency Detail] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest }>()
);

export const clearCurrentlySelectedAgent = createAction(
  '[Agency Detail] Clear Selected Agent'
);

export const loadAgencyStaffDetailSuccess = createAction(
  '[Agency Staff] Load Agency Staff Detail Success',
  props<{ agencyStaff: AgencyStaffWithDetail }>()
);

export const loadAgencyStaffDetailFailure = createAction(
  '[Agency Staff] Load Agency Staff Detail Failure',
  props<{ error: any }>()
);
