import { PrimaryAgentVM } from './primaryAgentVM';

export interface AgencyVM {
  orgId: string;
  agencyName: string;
  profileType: AgencyType;
  agencyProfileId: string;

  // For new agencies that are created, we'll get the agency
  // but not the primary agent until they've been approved
  primaryAgent?: PrimaryAgentVM;
}

export enum AgencyType {
  Broker = 'Broker',
  General = 'General',
}
