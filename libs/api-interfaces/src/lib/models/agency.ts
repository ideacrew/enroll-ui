export interface Agency {
  agencyProfileId: string;
  dba: string;
  legalName: string;
  agencyType: AgencyType;
  primaryAgent: PrimaryAgent;
}

/**
 * This is the agent that will be listed underneath the Agency Name
 *
 * The requirements doc calls this the `Writing Agent`
 *
 * Is there a more generic name? This may influence the `AgencyPosition` enum
 */
export interface PrimaryAgent {
  /**
   * `primary_broker_role_id` on a Broker Agency profile
   *
   * `_id` on the `broker_role` object
   *
   * no analog for General Agency "primary" agent
   */
  agentRoleId: string;
  firstName: string;
  lastName: string;
  npn: string; // what is the npn?
}

export enum AgencyType {
  Broker = 'Broker',
  General = 'General',
}
