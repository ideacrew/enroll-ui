import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface DateFromForm {
  day: number;
  month: number;
  year: number;
}

const msInOneYear = 1000 * 60 * 60 * 24 * 365.2425;

export function futureDate(control: FormGroup): ValidationErrors | null {
  const date = getControlsFromGroup(control);
  const dateInFuture = isDateInFuture(date);

  // tslint:disable-next-line: no-null-keyword
  return dateInFuture ? { futureDate: true } : null;
}

export function fakeDate(control: FormGroup): ValidationErrors | null {
  const date = getControlsFromGroup(control);
  const isFakeDate = isDateFake(date);

  // tslint:disable-next-line: no-null-keyword
  return isFakeDate ? { fakeDate: true } : null;
}

export function isDateInFuture(incomingDate: DateFromForm): boolean {
  const today = new Date();
  const dateObj = convertFormDateToObject(incomingDate);

  return today.getTime() < dateObj.getTime();
}
export function isDateInBob(incomingDate: DateFromForm): boolean {
  const today = new Date();
  const dateObj = convertFormDateToObject(incomingDate);

  return today.getTime() < dateObj.getTime();
}
export function isDateInBob2(incomingDate: DateFromForm): boolean {
  const today = new Date();
  const dateObj = convertFormDateToObject(incomingDate);

  return today.getTime() < dateObj.getTime();
}
export function isDateInBob3(incomingDate: DateFromForm): boolean {
  const today = new Date();
  const dateObj = convertFormDateToObject(incomingDate);

  return today.getTime() < dateObj.getTime();
}

export function isDateFake(incomingDate: DateFromForm): boolean {
  const { year, month, day } = incomingDate;
  const d = convertFormDateToObject(incomingDate);

  // https://stackoverflow.com/a/21188902/664747
  if (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  ) {
    return false;
  } else {
    return true;
  }
}

export function minimumAge(age: number): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const date = getControlsFromGroup(control);
    const isOldEnough = isAgeOldEnough(age, date);

    // tslint:disable-next-line: no-null-keyword
    return isOldEnough === false ? { notOldEnough: true } : null;
  };
}

export function isAgeOldEnough(
  age: number,
  incomingDate: DateFromForm,
  today = new Date()
): boolean {
  const incomingBirthDate = convertFormDateToObject(incomingDate);
  const ageInMilliseconds = age * msInOneYear;
  const differenceInAges = today.getTime() - incomingBirthDate.getTime();

  return differenceInAges > ageInMilliseconds;
}

function getControlsFromGroup(formGroup: FormGroup): DateFromForm {
  const day = formGroup.get('day');
  const month = formGroup.get('month');
  const year = formGroup.get('year');

  const date: DateFromForm = {
    day:
      typeof day.value === 'string'
        ? (parseInt(day.value, 10) as number)
        : (day.value as number),
    month:
      typeof month.value === 'string'
        ? (parseInt(month.value, 10) as number)
        : (month.value as number),
    year:
      typeof year.value === 'string'
        ? (parseInt(year.value, 10) as number)
        : (year.value as number),
  };

  return date;
}

function convertFormDateToObject(incomingDate: DateFromForm): Date {
  const { year, month, day } = incomingDate;

  return new Date(
    year,
    month - 1, // zero-based months
    day
  );
}
