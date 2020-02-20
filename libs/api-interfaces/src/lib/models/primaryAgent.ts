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
  agencyProfileId: string;
  npn: string; // what is the npn?
}
