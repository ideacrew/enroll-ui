import { createAction, props } from '@ngrx/store';
import { ToastRequest } from './toasts.models';

export const addToast = createAction(
  '[Toasts] Add Toast',
  props<{ request: ToastRequest }>()
);

export const dismissToast = createAction(
  '[Toasts] Dismiss Toast',
  props<{ toastId: number }>()
);
