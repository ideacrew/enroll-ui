import { createAction, props } from '@ngrx/store';

import { CurrentUser } from '@hbx/api-interfaces';

export const loadUser = createAction('[Current User] Load User');

export const loadUserSuccess = createAction(
  '[Current User] Load User Success',
  props<{ user: CurrentUser }>()
);

export const loadUserFailure = createAction(
  '[Current User] Load User Failure',
  props<{ error: any }>()
);
