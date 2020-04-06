import { HbxPermissions } from '@hbx/api-interfaces';

export function convertPermissions(permissions: HbxPermissions): string[] {
  return Object.entries(permissions).reduce(
    (newPermissions, [key, value]) =>
      value === true ? [...newPermissions, key] : [...newPermissions],
    []
  );
}
