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
  aasm_state: string; // aasm_state
  type?: string;
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

export interface AgentEmail {
  id: string;
  kind: EmailKind;
  address: string;
}

export enum EmailKind {
  Home = 'home',
  Work = 'work',
}
