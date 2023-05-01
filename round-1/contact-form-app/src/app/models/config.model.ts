interface FormField {
  'field-name': string;
  'field-type': string;
}

export interface FormConfig {
  'form-name': string;
  'form-fields': FormField[];
}

export interface MyObject {
  [key: string]: any;
}
