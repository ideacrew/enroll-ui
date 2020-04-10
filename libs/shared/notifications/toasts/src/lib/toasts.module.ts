import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromToasts from './store/toasts.reducer';
import { ToastsEffects } from './store/toasts.effects';
import { ToastsFacade } from './store/toasts.facade';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromToasts.TOASTS_FEATURE_KEY, fromToasts.reducer),
    EffectsModule.forFeature([ToastsEffects]),
  ],
  providers: [ToastsFacade],
  declarations: [ToastsContainerComponent, ToastComponent],
  exports: [ToastsContainerComponent],
})
export class ToastsModule {}
