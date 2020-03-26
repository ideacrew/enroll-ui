import { isDateInFuture } from './date.validator';

describe('validating dates', () => {
  it('should identify a date in the distant past as being before today', () => {
    const date1 = {
      day: '2',
      month: '2',
      year: '1980',
    };

    expect(isDateInFuture(date1)).toBeFalsy();
  });

  it('should return false for todays date compared to "now"', () => {
    const todaysDate = new Date();

    const date1 = {
      day: todaysDate.getDate().toString(),
      month: (todaysDate.getMonth() + 1).toString(),
      year: todaysDate.getUTCFullYear().toString(),
    };


    expect(isDateInFuture(date1)).toBeFalsy();
  });

  it('should return true for a date in the distant future', () => {
    const date1 = {
      day: '2',
      month: '2',
      year: '2050',
    };

    expect(isDateInFuture(date1)).toBeTruthy();
  })
});
