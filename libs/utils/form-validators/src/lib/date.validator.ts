import { FormGroup, ValidationErrors } from '@angular/forms';

export function validDate(control: FormGroup): ValidationErrors | null {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  const date = {
    day: day.value,
    month: month.value,
    year: year.value,
  };

  const futureDate = isDateInFuture(date);

  return futureDate ? { futureDate: true } : null;
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

  return today.getTime() < dateObj.getTime();
}
