import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, of, take } from 'rxjs';
import { ComponentType, FieldType, FormField } from './models/form.model';
import * as fieldData from '../../db.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

type FormDataRes = { data: FormField[] };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * For handling press enter
   * @param event
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  /**
   * For making layout
   */
  formData$: BehaviorSubject<FormField[]> = new BehaviorSubject<FormField[]>(
    []
  );

  /**
   * Data from backend
   */
  data: FormDataRes = fieldData as FormDataRes;

  /**
   * Reactive form
   */
  form: FormGroup;

  /**
   * Getter for ComponentType enum
   */
  get componentType() {
    return ComponentType;
  }

  /**
   * Getter for FieldType enum
   */
  get fieldType() {
    return FieldType;
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    of(this.data.data)
      .pipe(take(1))
      .subscribe((fields: FormField[]) => {
        const formConfig = fields.reduce(
          (config: { [key: string]: FormControl }, field: FormField) => {
            config[field.controlName] = new FormControl(
              { value: field.value, disabled: field.disabled },
              field.required ? this.resolveValidatorByField(field.type) : []
            );
            return config;
          },
          {}
        );

        this.form = this.formBuilder.group(formConfig);

        this.formData$.next(fields);
      });
  }

  /**
   * For resolving validators by type of field
   * @param {FieldType} fieldType
   * @returns
   */
  resolveValidatorByField(fieldType: FieldType): ValidationErrors | null {
    switch (fieldType) {
      case FieldType.checkbox:
        return [Validators.pattern('true')];
      default:
        return [Validators.required];
    }
  }

  /**
   * For sumbiting formdata if form is valid
   */
  submit(): void {
    if (this.form.valid) {
      const testForm = this.form.value;
      console.log('This form return testForm: ', testForm);
      this.form.reset();
      Object.keys(this.form.controls).forEach((field) => {
        this.form.get(field).enable();
      });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        this.form.get(field).markAsDirty();
        this.form.get(field).markAsTouched();
      });
    }
  }
}
