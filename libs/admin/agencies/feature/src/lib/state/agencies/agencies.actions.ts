import { createAction, props } from '@ngrx/store';

import { AgencyProfile } from '@hbx/api-interfaces';

export const loadAgencies = createAction('[Agencies] Load Agencies');

export const loadAgenciesSuccess = createAction(
  '[Agencies] Load Agencies Success',
  props<{ agencies: AgencyProfile[] }>()
);

export const loadAgenciesFailure = createAction(
  '[Agencies] Load Agencies Failure',
  props<{ error: any }>()
);
