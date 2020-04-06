import { convertPermissions } from './convertPermissions';

describe('Convert permissions object to array', () => {
  it('should return an array of permissions', () => {
    const permissions = {
      can_do_this: true,
      can_do_that: true,
      can_do_this_other_thing: true,
      can_not_do_this: false,
    };

    const expectedPermissions = [
      'can_do_this',
      'can_do_that',
      'can_do_this_other_thing',
    ];

    expect(convertPermissions(permissions)).toEqual(expectedPermissions);
  });
});
