import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PrimaryAgentsActions from './primary-agents.actions';
import { PrimaryAgentsEntity } from './primary-agents.models';

export const PRIMARYAGENTS_FEATURE_KEY = 'primaryAgents';

function selectAgencyProfileId(a: PrimaryAgentsEntity): string {
  //In this case this would be optional since primary key is id
  return a.connected_profile_id;
}

export interface State extends EntityState<PrimaryAgentsEntity> {
  selectedId?: string | number; // which PrimaryAgents record has been selected
  loaded: boolean; // has the PrimaryAgents list been loaded
  error?: string | null; // last none error (if any)
}

export interface PrimaryAgentsPartialState {
  readonly [PRIMARYAGENTS_FEATURE_KEY]: State;
}

export const primaryAgentsAdapter: EntityAdapter<PrimaryAgentsEntity> = createEntityAdapter<
  PrimaryAgentsEntity
>({
  selectId: selectAgencyProfileId,
});

export const initialState: State = primaryAgentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const primaryAgentsReducer = createReducer(
  initialState,
  on(PrimaryAgentsActions.loadPrimaryAgents, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    PrimaryAgentsActions.loadPrimaryAgentsSuccess,
    (state, { primaryAgents }) =>
      primaryAgentsAdapter.setAll(primaryAgents, {
        ...state,
        loaded: true,
      })
  ),
  on(PrimaryAgentsActions.loadPrimaryAgentsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return primaryAgentsReducer(state, action);
}
