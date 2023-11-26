import { ValidationErrors } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export const rangeValidator = (
  startControlName: string,
  endControlName: string
): ValidatorFn => {
  return (form: FormGroup): null | ValidationErrors => {
    const start: Date | null = form.get(startControlName)?.value;
    const end: Date | null = form.get(endControlName)?.value;
    const isRangeValid = end?.getTime() - start?.getTime() > 0;
    if (!start || !end) return null;

    return isRangeValid ? null : { rangeInvalid: true };
  };
};
