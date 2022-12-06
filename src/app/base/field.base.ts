import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormField } from '../models/form.model';

@Component({
  template: '',
})
export class FieldBase {
  @Input()
  fieldData: FormField;

  @Input()
  parentForm: FormGroup;

  @Output()
  valueChange: EventEmitter<string>;

  get getField() {
    return this.parentForm.get(this.fieldData.controlName);
  }

  constructor() {
    this.valueChange = new EventEmitter();
  }

  change(value: string): void {
    this.parentForm.get(this.fieldData.controlName).setValue(value);
    this.valueChange.next(value);
  }
}
