export interface DateOfBirth {
  year: number;
  month: number;
  day: number;
}

export function getDateOfBirth(dob: string): DateOfBirth {
  const [_, year, month, day] = dob.match(/(\d{4})-(\d{1,})-(\d{1,})/);

  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10),
  };
}

export function createDateFromDob(dob: DateOfBirth): Date {
  const { year, month, day } = dob;

  return new Date(year, month - 1, day);
}

