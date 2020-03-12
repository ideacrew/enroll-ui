import { EmailVM } from './emailVM';
import { AgencyRoleVM } from './agencyRoleVM';

export interface AgencyStaffVM {
  personId: string;
  firstName: string;
  lastName: string;
  hbxId: string;
  agencyRoles: AgencyRoleVM[];
}

export interface AgencyStaffDetailVM extends AgencyStaffVM {
  dob: Date;
  email: EmailVM[];
  ssn: string;
}
