import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { AgencyStaffDetailVM } from '@hbx/admin/shared/view-models';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';

interface DetailVM {
  agent: AgencyStaffDetailVM;
  loaded: boolean;
}

@Component({
  templateUrl: './agency-staff-detail.component.html',
  styleUrls: ['./agency-staff-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffDetailComponent {
  editingDemographics = false;

  demographicsForm: FormGroup;

  detailVM$: Observable<DetailVM> = combineLatest([
    this.agencyStaffFacade.loaded$,
    this.agencyStaffFacade.selectedAgencyStaff$,
  ]).pipe(
    map(([loaded, agent]: [boolean, AgencyStaffDetailVM]) => ({
      loaded,
      agent,
    })),
    filter(detailVM => detailVM.agent !== null),
    tap((detailVM: DetailVM) => {
      const { firstName, lastName, dob, ssn, email } = detailVM.agent;

      this.demographicsForm = this.fb.group({
        firstName,
        lastName,
        dob,
        ssn,
        email,
      });
    })
  );

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private fb: FormBuilder
  ) {}
}
