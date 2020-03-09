import { createAction, props } from '@ngrx/store';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyStaffWithDetail,
} from '@hbx/api-interfaces';

export const loadAgencyStaff = createAction('[AgencyStaff] Load AgencyStaff');

export const loadAgencyStaffSuccess = createAction(
  '[AgencyStaff] Load AgencyStaff Success',
  props<{
    agencyStaff: AgencyStaff[];
  }>()
);

export const loadAgencyStaffFailure = createAction(
  '[AgencyStaff] Load AgencyStaff Failure',
  props<{ error: any }>()
);

export const changeAgencyRole = createAction(
  '[AgencyStaff] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const changeAgencyRoleFailure = createAction(
  '[AgencyStaff] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest }>()
);

export const loadAgencyStaffDetailSuccess = createAction(
  '[AgencyStaff] Load Agency Staff Detail Success',
  props<{ agencyStaff: AgencyStaffWithDetail }>()
);

export const loadAgencyStaffDetailFailure = createAction(
  '[AgencyStaff] Load Agency Staff Detail Failure',
  props<{ error: any }>()
);
