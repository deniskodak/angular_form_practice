import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss']
})
export class CreateCourseStep3Component {
  form = new FormGroup({
    lessons: new FormArray([])
  })

  get lessons() {
    return this.form.controls.lessons;
  }

  addLesson() {
    const lesson = new FormGroup({
      title: new FormControl('', [Validators.required]),
      level: new FormControl('beginner', [Validators.required])
    })

    this.lessons.push(lesson);
  }

  removeLesson(index: number) {
    this.lessons.removeAt(index)
  }
}
