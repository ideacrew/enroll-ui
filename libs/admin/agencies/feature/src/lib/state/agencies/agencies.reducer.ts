import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AgenciesActions from './agencies.actions';
import { AgenciesEntity } from './agencies.models';

export const AGENCIES_FEATURE_KEY = 'agencies';

function selectAgencyId(a: AgenciesEntity): string {
  //In this case this would be optional since primary key is id
  return a.agency_profile_id;
}

export interface State extends EntityState<AgenciesEntity> {
  selectedId?: string | number; // which Agencies record has been selected
  loaded: boolean; // has the Agencies list been loaded
  error?: string | null; // last none error (if any)
}

export interface AgenciesPartialState {
  readonly [AGENCIES_FEATURE_KEY]: State;
}

export const agenciesAdapter: EntityAdapter<AgenciesEntity> = createEntityAdapter<
  AgenciesEntity
>({
  selectId: selectAgencyId,
});

export const initialState: State = agenciesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const agenciesReducer = createReducer(
  initialState,
  on(AgenciesActions.loadAgencies, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AgenciesActions.loadAgenciesSuccess, (state, { agencies }) =>
    agenciesAdapter.setAll(agencies, { ...state, loaded: true })
  ),
  on(AgenciesActions.loadAgenciesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return agenciesReducer(state, action);
}
