import { EmailKind } from '@hbx/api-interfaces';

export interface EmailVM {
  id: string;
  address: string;
  kind: EmailKind;
}
