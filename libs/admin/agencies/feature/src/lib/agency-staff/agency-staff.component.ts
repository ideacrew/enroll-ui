import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
  map,
  debounceTime,
  startWith,
  distinctUntilChanged,
} from 'rxjs/operators';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import { AgencyStaffVM } from '@hbx/admin/shared/view-models';
import { searchAgencyStaff } from '../utils';

@Component({
  templateUrl: './agency-staff.component.html',
  styleUrls: ['./agency-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffComponent implements OnInit {
  globalSearch: FormControl = new FormControl();

  globalSearch$: Observable<string> = this.globalSearch.valueChanges.pipe(
    debounceTime(200),
    map((query: string) => query.trim().toLowerCase())
  );

  agencyStaffVM$: Observable<AgencyStaffVM[]> = combineLatest([
    this.globalSearch$.pipe(startWith('')),
    this.agencyStaffFacade.allAgencyStaff$,
  ]).pipe(
    distinctUntilChanged(),
    map(([searchQuery, agencyStaffVMs]: [string, AgencyStaffVM[]]) => {
      return searchAgencyStaff(searchQuery, agencyStaffVMs);
    })
  );

  constructor(private agencyStaffFacade: AgencyStaffFacade) {}

  ngOnInit(): void {}

  logChange(event: any): void {
    console.log(event);
  }
}
