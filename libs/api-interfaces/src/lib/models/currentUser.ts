export interface HbxUser {
  account_name: string;
}

export interface HbxPermissions {
  [permission_name: string]: boolean;
}

export type CurrentUser = HbxUser & HbxPermissions;
