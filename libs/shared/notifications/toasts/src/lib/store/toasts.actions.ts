import { createAction, props } from '@ngrx/store';
import { ToastsEntity } from './toasts.models';

export const loadToasts = createAction('[Toasts] Load Toasts');

export const loadToastsSuccess = createAction(
  '[Toasts] Load Toasts Success',
  props<{ toasts: ToastsEntity[] }>()
);

export const loadToastsFailure = createAction(
  '[Toasts] Load Toasts Failure',
  props<{ error: any }>()
);
