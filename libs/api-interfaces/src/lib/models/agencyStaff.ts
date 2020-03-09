import { WorkflowStateTransition } from './workflowStateTransition';

export interface AgencyStaff {
  _id: string;
  first_name: string;
  last_name: string;
  hbx_id: string;
  agency_roles: AgencyRole[];
}

export interface AgencyStaffWithDetail extends AgencyStaff {
  agent_emails: AgentEmail[];
  dob: string; // will be converted to date object
  ssn: string;
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
  history?: WorkflowStateTransition<AgencyRoleState>[];
}

export enum AgencyRoleState {
  Applicant = 'applicant',

  BAPending = 'broker_agency_pending',
  BATerminated = 'broker_agency_terminated',
  GAPending = 'general_agency_pending',
  GATerminated = 'general_agency_terminated',

  Terminated = 'terminated',
  Pending = 'pending',
  Active = 'active',
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
