import { FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { rangeValidator } from "../../validators/range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = new FormGroup(
    {
      courseType: new FormControl("premium", [Validators.required]),
      price: new FormControl(null, [
        Validators.required,
        Validators.maxLength(9999),
        Validators.minLength(1),
        Validators.pattern("[0-9]+"),
      ]),
      promoStartAt: new FormControl(null),
      promoEndAt: new FormControl(null),
      fileUpload: new FormControl(null, [Validators.required]),
    },
    {
      validators: [rangeValidator("promoStartAt", "promoEndAt")],
    }
  );

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      if (value["courseType"] === "free" && this.form.controls.price.enabled) {
        this.form.controls.price.disable({ emitEvent: false });
      } else if (
        value["courseType"] === "premium" &&
        this.form.controls.price.disabled
      )
        this.form.controls.price.enable({ emitEvent: false });
    });
  }
}
