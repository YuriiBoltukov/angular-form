export interface FormField {
  label: string;
  controlName: string;
  description: string;
  choices?: string[];
  componentType: ComponentType;
  type: FieldType;
  disabled: boolean;
  required: boolean;
  value: string | boolean;
}

export enum ComponentType {
  input = 'input',
  select = 'select',
}

export enum FieldType {
  text = 'text',
  number = 'number',
  checkbox = 'checkbox',
}
