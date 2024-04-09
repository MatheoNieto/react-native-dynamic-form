export type TypeFields =
  | "title"
  | "text"
  | "number"
  | "table"
  | "signature"
  | "multiple_choice"
  | "single_choice"
  | "file"
  | "text_answer"
  | "location"
  | "date"
  | "date_time"
  | "select";

type FieldCommonType = {
  label: string;
  name: string;
  onChange?: (newValue: string) => void;
  value?: string;
  initialValue?: string;
  required?: boolean;
};

type MultipleChoiceType = FieldCommonType & {
  type: "multiple_choice";
  options: string[];
  value: string[];
  initialValue: string[];
};

type SingleChoiceType = FieldCommonType & {
  type: "single_choice";
  options: string[];
};

type InputTextNumberType = FieldCommonType & {
  type: "number" | "text";
  placeholder?: string;
};

export type SchemaFormType = {
  form: FORM_TYPE_SCHEMA_PROPS;
  typesFields: string[];
  propsFields: any;
};

export type FieldType =
  | MultipleChoiceType
  | SingleChoiceType
  | FieldCommonType
  | InputTextNumberType;

export type FORM_TYPE_SCHEMA_PROPS = {
  initialErrors: any;
  initialValues: any;
  labels: any;
  schema: any;
};

export type CREATE_SCHEMA_FORMS = {
  form: FORM_TYPE_SCHEMA_PROPS;
  typesFields: string[];
  propsFields: unknown;
};
