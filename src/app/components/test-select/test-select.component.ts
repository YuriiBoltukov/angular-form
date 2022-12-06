import { Component } from '@angular/core';
import { FieldBase } from 'src/app/base/field.base';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-test-select',
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss'],
})
export class TestSelectComponent extends FieldBase {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
