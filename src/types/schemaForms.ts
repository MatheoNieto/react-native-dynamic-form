export type TypeFields =
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

export type FieldCommonType = {
  label: string;
  type: TypeFields;
  onChange?: (newValue: string) => void;
  value: string;
  initialValue: string;
  required?: boolean;
};

type FORM_TYPE_SCHEMA_PROPS = {
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
