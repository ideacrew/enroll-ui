import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { ToastsEntity } from '../store/toasts.models';

@Component({
  selector: 'hbx-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(200)]),
    ]),
  ],
})
export class ToastComponent {
  @Input() toast: ToastsEntity;

  @Output() readonly dismissToast = new EventEmitter<number>();
}
