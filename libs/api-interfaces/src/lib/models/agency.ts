export interface Agency {
  organization_id: string;
  agency_profile_id: string;
  legal_name: string;
  dba: string;
  agency_profile_type: string;
}

/**
 * This is the agent that will be listed underneath the Agency Name
 *
 * The requirements doc calls this the `Writing Agent`
 *
 * Is there a more generic name? This may influence the `AgencyPosition` enum
 */

export enum AgencyType {
  Broker = 'Broker',
  General = 'General',
}
