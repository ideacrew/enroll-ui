/**
 * This is the agent that will be listed underneath the Agency Name
 *
 * The requirements doc calls this the `Writing Agent`
 *
 * Is there a more generic name? This may influence the `AgencyPosition` enum
 */
export interface WritingAgent {
  /**
   * `primary_broker_role_id` on a Broker Agency profile
   *
   * `_id` on the `broker_role` object
   *
   * no analog for General Agency "primary" agent
   */
  agentId: string;
  fullName: string;
  npn: string; // what is the npn?
}

export interface Agency {
  legalName: string;
  agencyType: AgencyType;
  writingAgent: WritingAgent;
}

export enum AgencyType {
  Broker = 'Broker',
  General = 'General',
}
