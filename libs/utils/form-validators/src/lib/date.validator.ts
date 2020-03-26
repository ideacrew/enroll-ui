import { FormGroup, ValidationErrors } from '@angular/forms';

export function validDate(control: FormGroup): ValidationErrors | null {
  const day = control.get('day');
  const month = control.get('day');
  const year = control.get('day');

  const date = {
    day: day.value,
    month: month.value,
    year: year.value,
  };

  const futureDate = isDateInFuture(date);

  return {
    futureDate,
  };
}

export function isDateInFuture(incomingDate: {
  month: string;
  day: string;
  year: string;
}): boolean {
  const today = new Date();
  const { year, month, day } = incomingDate;

  const dateObj = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );

  // console.log('dateObj', dateObj, dateObj.getTime());
  // console.log('today', today, today.getTime());

  return today.getTime() < dateObj.getTime();
}
