import { createReducer, on, Action } from '@ngrx/store';

import { ApiError } from '@hbx/api-interfaces';

import * as UserActions from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface State {
  email?: string;
  loaded: boolean; // has the User list been loaded
  error?: ApiError; // last none error (if any)
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
  on(UserActions.loadUser, state => ({ ...state, loaded: false, error: undefined })),
  on(UserActions.loadUserSuccess, (state, { user }) => {
    const { account_name, ...permissions } = user;

    return {
      ...state,
      email: account_name,
      loaded: true,
    };
  }),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}
