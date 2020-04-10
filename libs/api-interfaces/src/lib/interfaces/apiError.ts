import { HttpErrorResponse } from '@angular/common/http';

export interface ApiError extends HttpErrorResponse {
  error: {
    status: 'success' | 'error';
    message: string;
  };
}
