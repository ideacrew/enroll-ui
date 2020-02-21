import { Dictionary } from '@ngrx/entity';

import {
  AgencyStaffVM,
  AgencyVM,
  AgencyRoleVM,
  EmailVM,
} from '@hbx/admin/shared/view-models';
import { AgencyStaff, AgencyRole } from '@hbx/api-interfaces';

export function createSingleAgencyStaffVM(
  staff: AgencyStaff,
  agencyVMs: Dictionary<AgencyVM>
): AgencyStaffVM {
  const {
    _id,
    first_name,
    last_name,
    dob,
    agency_roles,
    agent_emails,
    hbx_id,
  } = staff;

  // Filter out roles where the agency staff role is held by the primary agent
  const filteredRoles: AgencyRole[] = agency_roles.filter(role => {
    const { primaryAgent } = agencyVMs[role.agency_profile_id];

    return hbx_id !== primaryAgent.hbxId;
  });

  const agencyRoles: AgencyRoleVM[] = filteredRoles.map(role => {
    const {
      orgId,
      profileType,
      primaryAgent,
      agencyProfileId,
      agencyName,
    } = agencyVMs[role.agency_profile_id];

    const agencyRole: AgencyRoleVM = {
      agencyName,
      currentState: role.aasm_state,
      orgId,
      primaryAgent,
      agencyProfileId,
      profileType,
    };

    return agencyRole;
  });

  const emails: EmailVM[] = agent_emails.map(email => {
    return { id: email.id, address: email.address, kind: email.kind };
  });

  const agencyStaffVM: AgencyStaffVM = {
    agencyRoles,
    emails,
    firstName: first_name,
    lastName: last_name,
    dob: new Date(dob),
    hbxId: hbx_id,
    personId: _id,
  };

  return agencyStaffVM;
}

export function filterAgencyStaffWithNoRoles(
  agencyStaff: AgencyStaffVM
): boolean {
  return agencyStaff.agencyRoles.length > 0;
}

export function createAllAgencyStaffVMs(
  agencyStaff: AgencyStaff[],
  agencies: Dictionary<AgencyVM>
): AgencyStaffVM[] {
  return agencyStaff
    .map(staff => createSingleAgencyStaffVM(staff, agencies))
    .filter(filterAgencyStaffWithNoRoles);
}
