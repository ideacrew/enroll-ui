import { createAction, props } from '@ngrx/store';

import { AgencyStaff } from '@hbx/api-interfaces';
import { TerminationRequest } from '@hbx/admin/shared/ui-components';

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

export const terminateAgencyRole = createAction(
  '[AgencyStaff] Terminate Agency Role', props<{ request: TerminationRequest }>()
)
