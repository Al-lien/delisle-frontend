import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchingValidator(
  field1: string,
  field2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(field1)?.value;
    const confirm = control.get(field2)?.value;

    return password !== confirm ? { match: true } : null;
  };
}
