export interface AgencyStaff {
  // Likely needed to update demographic information
  _id: string;

  // Needed for Agency Staff List View
  first_name: string;
  last_name: string;
  hbx_id: string;
  agency_roles: AgencyRole[];

  // Demographic Information
  agent_emails: AgentEmail[];
  dob: string; // will be converted to date object
}

export interface AgencyRole {
  role_id: string;
  /**
   * ### Needed to terminate the link between agent and agency
   *
   * `_id` on the agency profile
   *
   * `benefit_sponsors_broker_agency_profile_id` on a broker agent
   *
   * `benefit_sponsors_general_agency_profile_id` on a general agent
   */
  agency_profile_id: string;

  /**
   * The current state of the role with the Agency
   */
  aasm_state: AgencyRoleState; // aasm_state
  type?: string;
}

export const enum AgencyRoleState {
  BAPending = 'broker_agency_pending',
  BATerminated = 'broker_agency_terminated',
  GAPending = 'general_agency_pending',
  GATerminated = 'general_agency_terminated',

  Terminated = 'terminated',
  Pending = 'pending',
  Active = 'active',
}

export interface ChangeHistory<T> {
  changedFrom: T;
  changedTo: T;
  changedAt: string; // will be converted to Date object
}

export interface AgentEmail {
  id: string;
  kind: EmailKind;
  address: string;
}

export enum EmailKind {
  Home = 'home',
  Work = 'work',
}
