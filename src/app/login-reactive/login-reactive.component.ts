import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { createPasswordStrengthValidatorFn } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  email = new FormControl("", {
    validators: [Validators.email, Validators.required],
    updateOn: "blur",
    nonNullable: true, // non nullable default value
  });
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    createPasswordStrengthValidatorFn(),
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor() {}

  ngOnInit() {}

  reset() {
    this.form.reset();
    console.log(this.form.value);
  }
}
