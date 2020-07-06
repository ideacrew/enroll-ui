import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store, Action } from '@ngrx/store';

import { AgencyStaffDetailVM } from '@hbx/admin/shared/view-models';

import * as AgencyStaffSelectors from './agency-staff.selectors';

@Injectable()
export class AgencyStaffFacade {
  loaded$ = this.store.pipe(select(AgencyStaffSelectors.getAgencyStaffLoaded));
  allAgencyStaff$ = this.store.pipe(
    select(AgencyStaffSelectors.getAgencyStaffVMs)
  );

  selectedAgencyStaff$: Observable<AgencyStaffDetailVM> = this.store.pipe(
    select(AgencyStaffSelectors.selectedAgencyStaffVM)
  );

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
