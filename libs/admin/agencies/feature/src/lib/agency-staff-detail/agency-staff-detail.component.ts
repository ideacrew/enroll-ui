import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import {
  AgencyStaffDetailVM,
  EmailVM,
  ChangeHistory,
  AgencyRoleVM,
} from '@hbx/admin/shared/view-models';
import {
  RoleChangeRequest,
  AgentEmail,
  EmailKind,
  AgencyRoleState,
} from '@hbx/api-interfaces';

import { PermissionsService, HbxPermissions } from '@hbx/user/permissions';

import { AgencyStaffFacade } from '../state/agency-staff/agency-staff.facade';
import * as AgencyStaffActions from '../state/agency-staff/agency-staff.actions';

export interface ContactFormValue {
  emails: string[];
}

interface DetailVM {
  agent: AgencyStaffDetailVM;
  loaded: boolean;
}

/* tslint:disable:template-cyclomatic-complexity */
/* tslint:disable:template-no-call-expression */
@Component({
  templateUrl: './agency-staff-detail.component.html',
  styleUrls: ['./agency-staff-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyStaffDetailComponent {
  HbxPermissions = HbxPermissions;
  editingContactInfo = false;
  formSubscription: Subscription;

  contactForm: FormGroup;
  agencyStaff: AgencyStaffDetailVM;

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
      this.agencyStaff = detailVM.agent;

      const { email } = detailVM.agent;

      const emailFormArray = this.createEmailArray(email);

      this.contactForm = this.fb.group({
        emails: emailFormArray,
      });
    })
  );

  constructor(
    private agencyStaffFacade: AgencyStaffFacade,
    private fb: FormBuilder,
    public permissionsService: PermissionsService
  ) {}

  terminateAgencyRole(request: RoleChangeRequest): void {
    this.agencyStaffFacade.dispatch(
      AgencyStaffActions.terminateAgencyRoleDetailPage({ request })
    );
  }

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

  trackByChange(index: number, change: ChangeHistory<AgencyRoleState>): number {
    return change.changedAt.getTime();
  }

  trackByRole(index: number, role: AgencyRoleVM): string {
    return role.roleId;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
