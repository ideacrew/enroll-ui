import { createAction, props } from '@ngrx/store';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyStaffWithDetail,
  DemographicsUpdate,
  AgentEmail,
  ApiError,
} from '@hbx/api-interfaces';
import { AgencyStaffDetailVM } from '@hbx/admin/shared/view-models';

export const loadAgencyStaff = createAction('[Agency Staff] Load AgencyStaff');

export const loadAgencyStaffSuccess = createAction(
  '[Agency Staff] Load Agency Staff Success',
  props<{
    agencyStaff: AgencyStaff[];
  }>()
);

export const loadAgencyStaffFailure = createAction(
  '[Agency Staff] Load Agency Staff Failure',
  props<{ errorResponse: ApiError }>()
);

export const terminateAgencyRole = createAction(
  '[Agency Staff List] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleFailure = createAction(
  '[Agency Staff List] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest; errorResponse: ApiError }>()
);

export const terminateAgencyRoleDetailPage = createAction(
  '[Agency Staff Detail] Terminate Agency Role',
  props<{ request: RoleChangeRequest }>()
);

export const terminateAgencyRoleDetailPageFailure = createAction(
  '[Agency Staff Detail] Terminate Agency Role Failure',
  props<{ request: RoleChangeRequest; errorResponse: ApiError }>()
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
  props<{ errorResponse: ApiError }>()
);

export const updateStaffDemographics = createAction(
  '[Agency Staff Detail] Update Staff Demographics',
  props<{ agencyStaff: AgencyStaffDetailVM; update: DemographicsUpdate }>()
);

export const updateStaffDemographicsFailure = createAction(
  '[Agency Staff Detail] Update Staff Demographics Failure',
  props<{
    agencyStaff: AgencyStaffDetailVM;
    update: DemographicsUpdate;
    errorResponse: ApiError;
  }>()
);

export const updateStaffEmail = createAction(
  '[Agency Staff Detail] Update Staff Email',
  props<{ agencyStaff: AgencyStaffDetailVM; newEmails: AgentEmail[] }>()
);

export const updateStaffEmailFailure = createAction(
  '[Agency Staff Detail] Update Staff Email Failure',
  props<{
    agencyStaff: AgencyStaffDetailVM;
    newEmails: AgentEmail[];
    errorResponse: ApiError;
  }>()
);
