import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface DateFromForm {
  day: string;
  month: string;
  year: string;
}

const msInOneYear = 1000 * 60 * 60 * 24 * 365.2425;

export function futureDate(control: FormGroup): ValidationErrors | null {
  const date = getControlsFromGroup(control);
  const dateInFuture = isDateInFuture(date);

  return dateInFuture ? { futureDate: true } : null;
}

export function fakeDate(control: FormGroup): ValidationErrors | null {
  const date = getControlsFromGroup(control);
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

  // https://stackoverflow.com/a/21188902/664747
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

export function minimumAge(age: number): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const date = getControlsFromGroup(control);
    const isOldEnough = isAgeOldEnough(age, date);

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

  // console.log({
  //   today,
  //   incomingBirthDate,
  //   ageInMilliseconds,
  //   differenceInAges,
  // });

  return differenceInAges > ageInMilliseconds;
}

function getControlsFromGroup(formGroup: FormGroup): DateFromForm {
  const day = formGroup.get('day');
  const month = formGroup.get('month');
  const year = formGroup.get('year');

  const date: DateFromForm = {
    day: day.value,
    month: month.value,
    year: year.value,
  };

  return date;
}

function convertFormDateToObject(incomingDate: DateFromForm): Date {
  const { year, month, day } = incomingDate;

  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // zero-based months
    parseInt(day, 10)
  );
}
