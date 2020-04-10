import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromToasts from './store/toasts.reducer';
// import { ToastsEffects } from './store/toasts.effects.ts.ignore';
import { ToastsFacade } from './store/toasts.facade';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromToasts.TOASTS_FEATURE_KEY, fromToasts.reducer),
    EffectsModule.forFeature([]),
  ],
  providers: [ToastsFacade],
  declarations: [ToastComponent],
  exports: [ToastComponent],
})
export class ToastsModule {}
