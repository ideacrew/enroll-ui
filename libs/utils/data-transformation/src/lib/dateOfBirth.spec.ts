import { getDateOfBirth, createDateFromDob } from './dateOfBirth';

describe('Date of Birth conversion', () => {
  it('should return a date of birth object', () => {
    const d = new Date();

    const incomingDate = d.toISOString();

    expect(getDateOfBirth(incomingDate)).toEqual({
      year: d.getFullYear(),
      month: d.getMonth() + 1, // month is zero index based
      day: d.getDate(),
    });
  });

  it('should return a date of birth object', () => {
    const incomingDate = '2020-1-2';

    expect(getDateOfBirth(incomingDate)).toEqual({
      year: 2020,
      month: 1,
      day: 2,
    });
  });

  it('should convert back and forth regardless of time zone', () => {
    // Create dob - January 1, 1970 (UTC Timezone 00:00:00)
    const dob = new Date(1970, 0, 1); // zero-based month index

    // Create Date of Birth
    const dateOfBirth = getDateOfBirth(dob.toISOString());

    // Convert to Date
    const dobDate = createDateFromDob(dateOfBirth);

    // Convert back to Date of Birth
    const convertedDate = getDateOfBirth(dobDate.toISOString());

    expect(dateOfBirth.year).toEqual(convertedDate.year);
    expect(dateOfBirth.month).toEqual(convertedDate.month);
    expect(dateOfBirth.day).toEqual(convertedDate.day);
  });
});
