import { Observable } from "rxjs";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";

export const courseTitleValidator = (
  courseService: CoursesService
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return courseService.findAllCourses().pipe(
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLocaleLowerCase() ===
            control.value.toLowerCase()
        );

        return course ? { existedTitle: true } : null;
      })
    );
  };
};
