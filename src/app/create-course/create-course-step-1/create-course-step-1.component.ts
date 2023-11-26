import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title.validator";
import { CourseCategories } from "../../model/course";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = new FormGroup({
    title: new FormControl("", {
      validators: [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(5),
      ],
      asyncValidators: [courseTitleValidator(this.courseService)],
      updateOn: "blur",
    }),
    releaseDateAt: new FormControl(new Date(), [Validators.required]),
    downloadAllowed: new FormControl(false, [Validators.required]),
    longDescription: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
    ]),
    category: new FormControl("BEGINNER", [Validators.required]),
    // address: new FormControl(null, [Validators.required]),
  });

  courseCategories$: Observable<CourseCategories[]>;

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseCategories$ = this.courseService.findCourseCategories();

    const prevForm: string = localStorage.getItem("STEP_1");

    if (prevForm) {
      this.form.setValue(JSON.parse(prevForm));
    }

    this.form.valueChanges.pipe(filter(() => this.form.valid)).subscribe({
      next: (form) => {
        localStorage.setItem("STEP_1", JSON.stringify(form));
      },
    });
  }

  get title() {
    return this.form.controls["title"];
  }

  get longDescription() {
    return this.form.controls["longDescription"];
  }
}
