import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hbx-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
