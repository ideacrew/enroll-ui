import { Agency } from './agency';

export interface AgencyStaff {
  // Likely needed to update demographic information
  personId: string;

  // Needed for Agency Staff List View
  firstName: string;
  lastName: string;
  hbxId: string;
  agentRoles: AgentRole[];

  // Demographic Information
  email: string;
  dateOfBirth: string; // will be converted to date object
}

export interface AgentRole extends Agency {
  /**
   * ### Needed to terminate the link between agent and agency
   *
   * `_id` on the agency profile
   *
   * `benefit_sponsors_broker_agency_profile_id` on a broker agent
   *
   * `benefit_sponsors_general_agency_profile_id` on a general agent
   */
  agencyProfileId: string;

  /**
   * The current state of the role with the Agency
   */
  currentState: AgencyRoleState;

  /**
   * This is required for the detail page of each individual Agency Staff
   */
  roleChangeHistory: ChangeHistory<AgencyRoleState>[];
}

export const enum AgencyRoleState {
  Pending = 'Pending',
  Active = 'Active',
  Terminated = 'Terminated',
  Other = 'Other',
}

export interface ChangeHistory<T> {
  changedFrom: T;
  changedTo: T;
  changedAt: string; // will be converted to Date object
}
