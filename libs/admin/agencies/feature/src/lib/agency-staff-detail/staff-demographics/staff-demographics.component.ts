import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AgencyStaffDetailVM } from '@hbx/admin/shared/view-models';
import { futureDate, fakeDate, minimumAge } from '@hbx/utils/form-validators';
import { DemographicsUpdate } from '@hbx/api-interfaces';

import * as AgencyStaffActions from '../../state/agency-staff/agency-staff.actions';
import { AgencyStaffFacade } from '../../state/agency-staff/agency-staff.facade';
const oldestAllowableYear = new Date().getFullYear() - 100;
interface DemographicsFormValue {
  firstName: string;
  lastName: string;
  dob: {
    year: number;
    month: number;
    day: number;
  };
}

/* tslint:disable:template-cyclomatic-complexity */
/* tslint:disable:template-no-call-expression */
@Component({
  selector: 'hbx-staff-demographics',
  templateUrl: './staff-demographics.component.html',
  styleUrls: ['./staff-demographics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffDemographicsComponent {
  editingDemographics = false;
  MINIMUM_AGE = 18;
  demographicsForm: FormGroup;
  private _agent: AgencyStaffDetailVM;

  @Input() readonly canManage: boolean = false;

  // tslint:disable-next-line: no-unsafe-any
  @Input() set agencyStaff(staff: AgencyStaffDetailVM) {
    const { firstName, lastName, dob, email } = staff;
    this._agent = staff;

    this.demographicsForm = this.fb.group({
      firstName: [firstName, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      dob: this.fb.group(
        {
          year: [
            dob.editing.year,
            [
              Validators.required,
              Validators.min(oldestAllowableYear),
              Validators.max(new Date().getFullYear()),
            ],
          ],
          month: [
            dob.editing.month,
            [Validators.required, Validators.min(1), Validators.max(12)],
          ],
          day: [
            dob.editing.day,
            [Validators.required, Validators.min(1), Validators.max(31)],
          ],
        },
        { validators: [futureDate, fakeDate, minimumAge(this.MINIMUM_AGE)] }
      ),
    });
  }

  get agencyStaff(): AgencyStaffDetailVM {
    return this._agent;
  }

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private fb: FormBuilder
  ) {}

  cancelEditingDemographics(): void {
    this.editingDemographics = false;
    const { firstName, lastName, dob } = this.agencyStaff;
    this.demographicsForm.patchValue({
      firstName,
      lastName,
      dob: {
        year: dob.editing.year,
        month: dob.editing.month,
        day: dob.editing.day,
      },
    });
  }

  updateDemographics(): void {
    this.editingDemographics = false;

    const update = this.createUpdateFromForm(this.demographicsForm);

    if (this.demographicsChanged() === true) {
      this.agencyStaffFacade.dispatch(
        AgencyStaffActions.updateStaffDemographics({
          agencyStaff: this.agencyStaff,
          update,
        })
      );
    }
  }

  demographicsChanged(): boolean {
    const { firstName, lastName, dob } = this.agencyStaff;
    const update = this.createUpdateFromForm(this.demographicsForm);

    const sameFirstName = firstName !== update.first_name.trim();
    const sameLastName = lastName !== update.last_name.trim();

    const { year, day, month } = dob.editing;
    const agencyStaffDob = `${year}-${month}-${day}`;

    const sameDob = agencyStaffDob !== update.dob;

    return sameFirstName || sameLastName || sameDob;
  }

  /**
   * Ensures demographics form is valid and has had changes made to it
   */
  validDemographicsForm(): boolean {
    return this.demographicsForm.valid && this.demographicsChanged() === true;
  }

  getDateError(errorCode: string): boolean {
    return this.demographicsForm.get('dob').hasError(errorCode);
  }

  validDateControl(controlName: string): boolean {
    const formControl = this.demographicsForm.get('dob').get(controlName);

    return (
      formControl.hasError('min') === false &&
      formControl.hasError('max') === false &&
      formControl.hasError('required') === false
    );
  }

  createUpdateFromForm(demographicsForm: FormGroup): DemographicsUpdate {
    const {
      firstName,
      lastName,
      dob,
    } = demographicsForm.value as DemographicsFormValue;

    const update: DemographicsUpdate = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      dob: `${dob.year}-${dob.month}-${dob.day}`,
    };

    return update;
  }
}
