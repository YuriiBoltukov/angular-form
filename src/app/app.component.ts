import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, take } from 'rxjs';
import { ComponentType, FieldType, FormField } from './models/form.model';
import * as fieldData from '../../db.json';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type FormDataRes = { data: FormField[] };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formData$: BehaviorSubject<FormField[]> = new BehaviorSubject<FormField[]>(
    []
  );

  data: FormDataRes = fieldData as FormDataRes;

  form: FormGroup;

  get componentType() {
    return ComponentType;
  }

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
              field.value,
              field.required ? [Validators.required] : []
            );
            return config;
          },
          {}
        );
        console.log(formConfig);
        this.form = this.formBuilder.group(formConfig);

        this.form.valueChanges.subscribe((item) => console.log(item));

        this.formData$.next(fields);
      });
  }
}

/**
 * const formConfig = {
            birth_date: new FormControl(null, {
                validators: [Validators.required],
            }),
            birth_address: [null, [Validators.required, validateSimpleAddress, UniversalValidators.noEmptyString]],
            passport_address: [null, [Validators.required]],
            current_address: [null, [Validators.required]],
            temporary_address: [null],
            insurance_number: [null, [Validators.minLength(14), checkSnilsValidator]],
            tax_number: [null, [Validators.minLength(14), checkINNValidator]],
            has_current_address: [false],
            has_temporary_address: [false],
        };
this.form = this.fb.group(formConfig);
 */
