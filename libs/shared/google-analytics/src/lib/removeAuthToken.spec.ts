import { removeAuthToken } from './removeAuthToken';

describe('Removing auth token from url', () => {
  const newPath = '/admin/agencies/agency-staff';

  it('should remove a token from a url', () => {
    const path = '/admin/agencies/agency-staff?auth-token=abcd123';
    expect(removeAuthToken(path)).toEqual(newPath);
  });

  it('should return a url as-is with no token', () => {
    const path = '/admin/agencies/agency-staff';
    expect(removeAuthToken(path)).toEqual(newPath);
  });
});
