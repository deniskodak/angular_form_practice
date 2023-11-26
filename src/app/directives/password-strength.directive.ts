import { NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";
import { Directive } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";
import { createPasswordStrengthValidatorFn } from "../validators/password-strength.validator";

@Directive({
  selector: "input[passwordStrength]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  validator: ValidatorFn = createPasswordStrengthValidatorFn();

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }
}
