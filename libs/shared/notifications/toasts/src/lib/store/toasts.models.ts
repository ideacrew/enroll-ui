/**
 * Interface for the 'Toasts' data
 */
export interface ToastsEntity {
  id: number; // Primary ID
  heading: string;
  message: string;
  dismissed: boolean;
  type?: ToastType;
}

export enum ToastType {
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export interface ToastRequest {
  heading: string;
  message: string;
  type?: ToastType;
}
