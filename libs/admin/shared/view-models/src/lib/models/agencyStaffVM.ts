import { EmailVM } from './emailVM';
import { AgencyRoleVM } from './agencyRoleVM';

import { DateOfBirth } from '@hbx/utils/data-transformation';

export interface AgencyStaffVM {
  personId: string;
  firstName: string;
  lastName: string;
  hbxId: string;
  agencyRoles: AgencyRoleVM[];
}

export interface AgencyStaffDetailVM extends AgencyStaffVM {
  dob: {
    editing: DateOfBirth;
    display: Date;
  };
  email: EmailVM[];
  ssn: string;
}


