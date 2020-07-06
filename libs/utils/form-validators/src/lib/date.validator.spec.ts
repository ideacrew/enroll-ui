import { isDateInFuture, isDateFake, isAgeOldEnough } from './date.validator';

describe('validating dates', () => {
  describe('check to see if date is in the future', () => {
    it('should identify a date in the distant past as being before today', () => {
      const date1 = {
        month: 2,
        day: 2,
        year: 1980,
      };

      expect(isDateInFuture(date1)).toBeFalsy();
    });

    it('should return false for todays date compared to "now"', () => {
      const todaysDate = new Date();

      const date1 = {
        day: todaysDate.getDate(),
        month: (todaysDate.getMonth() + 1),
        year: todaysDate.getUTCFullYear(),
      };

      expect(isDateInFuture(date1)).toBeFalsy();
    });

    it('should return true for a date in the distant future', () => {
      const date1 = {
        month: 2,
        day: 2,
        year: 2050,
      };

      expect(isDateInFuture(date1)).toBeTruthy();
    });
  });

  describe('check to see if a date is fake', () => {
    it('should return true when Feb 31, 2007 is passed in', () => {
      const date1 = {
        month: 2,
        day: 31,
        year: 2007,
      };

      expect(isDateFake(date1)).toBeTruthy();
    });

    it('should return false when Feb 29, 2020 is passed in', () => {
      const date1 = {
        month: 2,
        day: 29,
        year: 2020,
      };

      expect(isDateFake(date1)).toBeFalsy();
    });
    it('should return true when Aug 32, 2007 is passed in', () => {
      const date1 = {
        month: 8,
        day: 32,
        year: 2007,
      };

      expect(isDateFake(date1)).toBeTruthy();
    });
  });

  describe('check to see if a date is an appropriate age', () => {
    it('should return true when Jan 1, 2004 is passed in and the minimum age is 16', () => {
      const date1 = {
        month: 1,
        day: 1,
        year: 2004,
      };

      const today = new Date(2020, 2, 27);

      expect(isAgeOldEnough(16, date1, today)).toBeTruthy();
    });

    it('should return true when Jan 1, 2004 is passed in and the minimum age is 16', () => {
      const date1 = {
        month: 1,
        day: 1,
        year: 2004,
      };

      const today = new Date(2020, 0, 1);

      expect(isAgeOldEnough(16, date1, today)).toBeTruthy();
    });

    it('should return false when Feb 28, 2010 is passed in and the minimum age is 16', () => {
      const date1 = {
        month: 2,
        day: 28,
        year: 2010,
      };

      const today = new Date(2020, 2, 27);

      expect(isAgeOldEnough(16, date1, today)).toBeFalsy();
    });
    it('should return true when Aug 30, 2007 is passed in and the minimum age is 16', () => {
      const date1 = {
        month: 8,
        day: 30,
        year: 2007,
      };

      const today = new Date(2027, 2, 27);

      expect(isAgeOldEnough(19, date1, today)).toBeTruthy();
    });
  });
});
