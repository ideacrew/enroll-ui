import { createReducer, on, Action } from '@ngrx/store';

import { convertPermissions } from '@hbx/user/permissions';

import * as UserActions from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface State {
  email?: string;
  permissions?: string[];
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last none error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => {
    const { account_name, ...permissions } = user;
    const newPermissions = convertPermissions(permissions);

    return {
      ...state,
      email: account_name,
      permissions: newPermissions,
      loaded: true,
    };
  }),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
