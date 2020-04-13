export interface HbxUser {
  account_name: string;
}

export interface HbxPermissions {
  [permissionName: string]: boolean;
}

export type CurrentUser = HbxUser & HbxPermissions;
