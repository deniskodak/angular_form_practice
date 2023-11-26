import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { of } from "rxjs";
import { environment } from "../../environments/environment";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFormat: string;
  fileName: string = "";

  fileUploadError: boolean = false;
  fileUploadSuccess: boolean = false;
  uploadProgress: number = 0;
  disabled: boolean = false;

  onChange = (fileName: string) => {};
  onTouch = () => {};
  onValidatorChange = () => {};

  constructor(private http: HttpClient) {}

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files && files[0]) {
      this.fileName = files[0].name;
      const formData = new FormData();
      formData.append("thumbnail", files[0]);

      this.http
        .post(`${environment.api}/api/thumbnail-upload`, formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
          if (event.type === HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  onClick(fileUploadElement: HTMLInputElement) {
    fileUploadElement.click();
    this.onTouch();
  }

  writeValue(value: any): void {
    this.fileName = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: ValidationErrors = {
      requiredFormat: this.requiredFormat,
    };

    if (this.fileUploadError) {
      errors.fileUploadError = true;
    }

    return errors;
  }
}
