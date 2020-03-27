import { FormGroup, ValidationErrors } from '@angular/forms';

export interface DateFromForm {
  day: string;
  month: string;
  year: string;
}

export function futureDate(control: FormGroup): ValidationErrors | null {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  const date: DateFromForm = {
    day: day.value,
    month: month.value,
    year: year.value,
  };

  const dateInFuture = isDateInFuture(date);

  return dateInFuture ? { futureDate: true } : null;
}

export function fakeDate(control: FormGroup): ValidationErrors | null {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  const date: DateFromForm = {
    day: day.value,
    month: month.value,
    year: year.value,
  };

  const isFakeDate = isDateFake(date);

  return isFakeDate ? { fakeDate: true } : null;
}

export function isDateInFuture(incomingDate: DateFromForm): boolean {
  const today = new Date();

  const dateObj = convertFormDateToObject(incomingDate);
  return today.getTime() < dateObj.getTime();
}

export function isDateFake(incomingDate: DateFromForm): boolean {
  const { year, month, day } = incomingDate;
  const d = convertFormDateToObject(incomingDate);

  if (
    d.getFullYear() === parseInt(year, 10) &&
    d.getMonth() === parseInt(month, 10) - 1 &&
    d.getDate() === parseInt(day, 10)
  ) {
    return false;
  } else {
    return true;
  }
}

function convertFormDateToObject(incomingDate: DateFromForm): Date {
  const { year, month, day } = incomingDate;

  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // zero-based months
    parseInt(day, 10)
  );
}
