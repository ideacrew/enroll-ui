export function hasAllPermissions(
  existingPermissions: string[],
  requiredPermissions: string[]
): boolean {
  let hasPermissions = true;

  for (const permission of requiredPermissions) {
    const hasPermission = existingPermissions.includes(permission);

    if (hasPermission === false) {
      hasPermissions = false;
    }
  }

  return hasPermissions;
}
