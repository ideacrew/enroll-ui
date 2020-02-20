import { EmailVM } from './emailVM';
import { AgencyRoleVM } from './agencyRoleVM';

export interface AgencyStaffVM {
  personId: string;
  firstName: string;
  lastName: string;
  hbxId: string;
  emails: EmailVM[];
  agencyRoles: AgencyRoleVM[];
  dob: Date;
}
