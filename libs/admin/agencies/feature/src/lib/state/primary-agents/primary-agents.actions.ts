import { createAction, props } from '@ngrx/store';
import { PrimaryAgentsEntity } from './primary-agents.models';

export const loadPrimaryAgents = createAction(
  '[PrimaryAgents] Load PrimaryAgents'
);

export const loadPrimaryAgentsSuccess = createAction(
  '[PrimaryAgents] Load PrimaryAgents Success',
  props<{ primaryAgents: PrimaryAgentsEntity[] }>()
);

export const loadPrimaryAgentsFailure = createAction(
  '[PrimaryAgents] Load PrimaryAgents Failure',
  props<{ error: any }>()
);
