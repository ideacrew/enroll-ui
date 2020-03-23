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

  it('should return a date object from a Date of Birth object', () => {
    expect(createDateFromDob({ year: 1970, month: 1, day: 1 })).toEqual(
      new Date('1970-01-01T05:00:00.000Z')
    );
  });
});
