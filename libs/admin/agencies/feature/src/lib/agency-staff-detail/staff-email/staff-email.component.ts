import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { AgencyStaffDetailVM, EmailVM } from '@hbx/admin/shared/view-models';
import { AgentEmail, EmailKind } from '@hbx/api-interfaces';

import * as AgencyStaffActions from '../../state/agency-staff/agency-staff.actions';
import { AgencyStaffFacade } from '../../state/agency-staff/agency-staff.facade';

interface ContactFormValue {
  emails: string[];
}

@Component({
  selector: 'hbx-staff-email',
  templateUrl: './staff-email.component.html',
  styleUrls: ['./staff-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffEmailComponent {
  contactForm: FormGroup;
  editingContactInfo = false;
  private _agent: AgencyStaffDetailVM;
  @Input() readonly canManage: boolean = false;

  // tslint:disable-next-line: no-unsafe-any
  @Input() set agencyStaff(staff: AgencyStaffDetailVM) {
    const { email } = staff;
    this._agent = staff;
    const emailFormArray = this.createEmailArray(email);

    this.contactForm = this.fb.group({
      emails: emailFormArray,
    });
  }

  get agencyStaff(): AgencyStaffDetailVM {
    return this._agent;
  }
  constructor(
    private fb: FormBuilder,
    private agencyStaffFacade: AgencyStaffFacade
  ) {}

  cancelEditingEmail(): void {
    this.editingContactInfo = false;
    const { email } = this.agencyStaff;

    this.contactForm.get('emails').setValue(email);
  }

  updateEmail(): void {
    this.editingContactInfo = false;

    const newEmails = this.contactForm.get('emails').value as AgentEmail[];

    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.updateStaffEmail({
        agencyStaff: this.agencyStaff,
        newEmails,
      })
    );
  }

  createEmailArray(emails: EmailVM[]): FormArray {
    const emailFormArray: FormArray = this.fb.array([]);

    for (const email of emails) {
      emailFormArray.push(
        this.fb.group({
          id: email.id,
          kind: EmailKind.Work,
          address: [email.address, [Validators.email, Validators.required]],
        })
      );
    }

    return emailFormArray;
  }

  get contactEmails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  isValidEmail(index: number): boolean {
    return this.contactEmails.at(index).valid;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
