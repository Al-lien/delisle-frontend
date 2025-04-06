import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * L'ANSSI (National Agency of IT Security) recommand the use of a strong password in order to reinforce system security.
 * Here's the most common recommendations :
 * - minimal length of 12 caracters
 * - Use of lowercase and uppercase
 * - Use of numbers
 * - Use of special characters such as : !, @, #, $, %
 * - No oversimple letters sequences like common words, birthday dates, or names
 *
 * @param control : the form control on which the validators is.
 * @returns a {@link ValidationErrors} property -> a kind of object of boolean|null.
 */

// EXPORT
export const passwordFormatValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value;

  if (!password) {
    return null;
  }

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;

  const valid = hasLowerCase && hasUpperCase && hasSpecialChar && hasMinLength;

  return !valid ? { strong: true } : null;
};
