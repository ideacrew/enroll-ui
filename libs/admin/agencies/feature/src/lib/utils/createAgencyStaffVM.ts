import { Dictionary } from '@ngrx/entity';

import {
  AgencyStaffVM,
  AgencyVM,
  AgencyRoleVM,
  EmailVM,
  PrimaryAgentVM,
  AgencyStaffDetailVM,
  ChangeHistory,
} from '@hbx/admin/shared/view-models';
import {
  AgencyStaff,
  AgencyRole,
  PrimaryAgent,
  AgencyRoleState,
  AgencyStaffWithDetail,
  EmailKind,
} from '@hbx/api-interfaces';
import {
  getDateOfBirth,
  createDateFromDob,
  DateOfBirth,
} from '@hbx/utils/data-transformation';

export function createSingleAgencyStaffVM(
  staff: AgencyStaff,
  agencyVMs: Dictionary<AgencyVM>
): AgencyStaffVM {
  const { _id, first_name, last_name, agency_roles, hbx_id } = staff;

  // Filter out roles where the agency staff role is held by the primary agent
  // or where the agency doesn't exit?
  const filteredRoles: AgencyRole[] = agency_roles.filter(role => {
    let agencyVM: AgencyVM;
    let primaryAgent: PrimaryAgentVM;

    agencyVM = agencyVMs[role.agency_profile_id];

    if (agencyVM !== undefined) {
      primaryAgent = agencyVM.primaryAgent;
      return hbx_id !== primaryAgent.hbxId;
    } else {
      return false;
    }
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
      currentState: convertAasmState(role.aasm_state),
      roleId: role.role_id,
      orgId,
      primaryAgent,
      agencyProfileId,
      profileType,
    };

    return agencyRole;
  });

  const agencyStaffVM: AgencyStaffVM = {
    agencyRoles,
    firstName: first_name,
    lastName: last_name,
    hbxId: hbx_id,
    personId: _id,
  };

  return agencyStaffVM;
}

export function createSingleAgencyStaffDetailVM(
  staff: AgencyStaffWithDetail,
  agencyVMs: Dictionary<AgencyVM>
): AgencyStaffDetailVM {
  const {
    _id,
    first_name,
    last_name,
    agency_roles,
    hbx_id,
    agent_emails,
    dob,
    ssn,
    has_active_enrollment,
  } = staff;

  // Filter out roles where the agency staff role is held by the primary agent
  // or where the agency doesn't exist?
  const filteredRoles: AgencyRole[] = agency_roles.filter(role => {
    let agencyVM: AgencyVM;
    let primaryAgent: PrimaryAgentVM;

    agencyVM = agencyVMs[role.agency_profile_id];

    if (agencyVM !== undefined) {
      primaryAgent = agencyVM.primaryAgent;
      return hbx_id !== primaryAgent.hbxId;
    } else {
      return false;
    }
  });

  const agencyRoles: AgencyRoleVM[] = filteredRoles.map(role => {
    const {
      orgId,
      profileType,
      primaryAgent,
      agencyProfileId,
      agencyName,
    } = agencyVMs[role.agency_profile_id];

    const changeHistory: ChangeHistory<AgencyRoleState>[] = role.history
      .map(transition => {
        return {
          changedFrom: convertAasmState(transition.from_state),
          changedTo: convertAasmState(transition.to_state),
          changedAt: new Date(transition.transition_at),
        };
      })
      .sort((a, b) => a.changedAt.getTime() - b.changedAt.getTime());

    const agencyRole: AgencyRoleVM = {
      agencyName,
      currentState: convertAasmState(role.aasm_state),
      roleId: role.role_id,
      orgId,
      primaryAgent,
      agencyProfileId,
      profileType,
      changeHistory,
    };

    return agencyRole;
  });

  const workEmail = agent_emails
    .filter(personEmail => personEmail.kind === EmailKind.Work)
    .map(personEmail => {
      return {
        id: personEmail.id,
        address: personEmail.address,
        kind: personEmail.kind,
      };
    });

  const email =
    workEmail.length > 0
      ? workEmail
      : [
          {
            id: 'no-work-email',
            address: 'No work email set',
            kind: EmailKind.Work,
          },
        ];

  const agencyStaffVM: AgencyStaffDetailVM = {
    agencyRoles,
    firstName: first_name,
    lastName: last_name,
    hbxId: hbx_id,
    personId: _id,
    dob: createDobVM(dob),
    email,
    ssn,
    activeEnrollment: has_active_enrollment,
  };

  return agencyStaffVM;
}

export function filterAgencyStaffWithNoRoles(
  agencyStaff: AgencyStaffVM | AgencyStaffDetailVM
): boolean {
  return agencyStaff.agencyRoles.length > 0;
}

export function createAllAgencyStaffVMs(
  agencyStaff: AgencyStaff[],
  agencies: Dictionary<AgencyVM>
): (AgencyStaffVM | AgencyStaffDetailVM)[] {
  return agencyStaff
    .map(staff => {
      if (isStaffWithDetail(staff)) {
        return createSingleAgencyStaffDetailVM(staff, agencies);
      } else {
        return createSingleAgencyStaffVM(staff, agencies);
      }
    })
    .filter(filterAgencyStaffWithNoRoles);
}

export function createAgencyStaffDetailVM(
  agencyStaffDetail: AgencyStaffWithDetail,
  agencies: Dictionary<AgencyVM>
): AgencyStaffDetailVM {
  return createSingleAgencyStaffDetailVM(agencyStaffDetail, agencies);
}

export function createPrimaryAgentDictionary(
  primaryAgents: PrimaryAgent[]
): Dictionary<PrimaryAgent> {
  const primaryAgentDictionary: Dictionary<PrimaryAgent> = primaryAgents.reduce(
    (dictionary, agent) => {
      return {
        ...dictionary,
        [agent.connected_profile_id]: agent,
      };
    },
    {}
  );

  return primaryAgentDictionary;
}

export function convertAasmState(aasmState: AgencyRoleState): AgencyRoleState {
  if (
    aasmState === AgencyRoleState.GATerminated ||
    aasmState === AgencyRoleState.BATerminated
  ) {
    return AgencyRoleState.Terminated;
  }

  if (
    aasmState === AgencyRoleState.GAPending ||
    aasmState === AgencyRoleState.BAPending
  ) {
    return AgencyRoleState.Pending;
  }

  return aasmState;
}

export function isStaffWithDetail(
  staff: AgencyStaff | AgencyStaffWithDetail
): staff is AgencyStaffWithDetail {
  return (staff as AgencyStaffWithDetail).agent_emails !== undefined;
}

export function createDobVM(
  dob: string
): { editing: DateOfBirth; display: Date } {
  const dateOfBirth: DateOfBirth = getDateOfBirth(dob);
  const displayDob: Date = createDateFromDob(dateOfBirth);

  return {
    editing: dateOfBirth,
    display: displayDob,
  };
}
