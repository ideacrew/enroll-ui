import { hasAllPermissions } from './hasAllPermissions';

describe('Checks all permissions for a set of permissions', () => {
  it('should check to see that given permissions match set of required permissions', () => {
    const requiredPermissions = ['permission1', 'permission2'];

    const existingPermissions = [
      'permission1',
      'permission2',
      'permission3',
      'permission4',
    ];

    expect(
      hasAllPermissions(existingPermissions, requiredPermissions)
    ).toBeTruthy();
  });

  it('should check to see that given permissions match set of required permissions', () => {
    const requiredPermissions = ['permission1', 'permission2'];

    const existingPermissions = ['permission1', 'permission3', 'permission4'];

    expect(
      hasAllPermissions(existingPermissions, requiredPermissions)
    ).toBeFalsy();
  });

  it('should check to see that given permissions match set of required permissions', () => {
    const requiredPermissions = ['permission2', 'permission1'];

    const existingPermissions = ['permission3', 'permission2', 'permission1'];

    expect(
      hasAllPermissions(existingPermissions, requiredPermissions)
    ).toBeTruthy();
  });

  it('should check to see that given permissions match set of required permissions', () => {
    const requiredPermissions = ['permission4', 'permission1'];

    const existingPermissions = ['permission3', 'permission2', 'permission1'];

    expect(
      hasAllPermissions(existingPermissions, requiredPermissions)
    ).toBeFalsy();
  });
});
