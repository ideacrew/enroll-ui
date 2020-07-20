import {
  isDateInFuture,
  isDateFake,
  isAgeOldEnough,
  DateFromForm,
} from './date.validator';

function createDate(month: number, day: number, year: number): DateFromForm {
  return {
    month,
    day,
    year,
  };
}

describe('validating dates', () => {
  describe('check to see if date is in the future', () => {
    it('should identify a date in the distant past as being before today', () => {
      expect(isDateInFuture(createDate(2, 2, 1980))).toBeFalsy();
    });

    it('should return false for todays date compared to "now"', () => {
      const todaysDate = new Date();

      const date1 = {
        day: todaysDate.getDate(),
        month: todaysDate.getMonth() + 1,
        year: todaysDate.getUTCFullYear(),
      };

      expect(isDateInFuture(date1)).toBeFalsy();
    });

    it('should return true for a date in the distant future', () => {
      expect(isDateInFuture(createDate(2, 2, 2050))).toBeTruthy();
    });
  });

  describe('check to see if a date is fake', () => {
    it('should return true when Feb 31, 2007 is passed in', () => {
      expect(isDateFake(createDate(2, 31, 2007))).toBeTruthy();
    });

    it('should return false when Feb 29, 2020 is passed in', () => {
      expect(isDateFake(createDate(2, 29, 2020))).toBeFalsy();
    });

    it('should return true when Aug 32, 2007 is passed in', () => {
      expect(isDateFake(createDate(8, 32, 2007))).toBeTruthy();
    });
  });

  describe('check to see if a date is an appropriate age', () => {
    it('should return true when Jan 1, 2004 is passed in and the minimum age is 16', () => {
      const today = new Date(2020, 2, 27);

      expect(isAgeOldEnough(16, createDate(1, 1, 2004), today)).toBeTruthy();
    });

    it('should return true when Jan 1, 2004 is passed in and the minimum age is 16', () => {
      const today = new Date(2020, 0, 1);

      expect(isAgeOldEnough(16, createDate(1, 1, 2004), today)).toBeTruthy();
    });

    it('should return false when Feb 28, 2010 is passed in and the minimum age is 16', () => {
      const today = new Date(2020, 2, 27);

      expect(isAgeOldEnough(16, createDate(2, 28, 2010), today)).toBeFalsy();
    });
    it('should return true when Aug 30, 2007 is passed in and the minimum age is 16', () => {
      const today = new Date(2027, 2, 27);

      expect(isAgeOldEnough(19, createDate(8, 30, 2007), today)).toBeTruthy();
    });
  });
});
