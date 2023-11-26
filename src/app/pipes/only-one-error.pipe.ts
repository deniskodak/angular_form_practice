import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Pipe({
  name: "onlyOneError",
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(
    fieldErrors: ValidationErrors,
    errorsPriority: string[]
  ): null | ValidationErrors {
    if (!fieldErrors) return null;

    let onlyOneError: ValidationErrors | null = null;

    for (let error of errorsPriority) {
      if (fieldErrors[error]) {
        onlyOneError = { [error]: fieldErrors[error] };
        break;
      }
    }

    return onlyOneError;
  }
}
