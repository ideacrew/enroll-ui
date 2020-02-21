export interface PrimaryAgent {
  /**
   * `primary_broker_role_id` on a Broker Agency profile
   *
   * `_id` on the `broker_role` object
   *
   * no analog for General Agency "primary" agent
   */
  agency_role_id: string;
  first_name: string;
  last_name: string;
  connected_profile_id: string;
  agent_npn: string; // what is the npn?
  hbx_id: string;
}
