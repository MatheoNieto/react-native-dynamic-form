import * as Yup from "yup";
// @ts-ignore
import { ObjectShape } from "yup/lib/object";
import { FileUploaded } from "@components/InputFileUploadAutomatic/types";
import { TextStyle, ViewStyle } from "react-native";
import { RadioButtonProps } from "react-native-radio-buttons-group/lib/types";

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

type TitleType = {
  type: "title";
  name: string;
  labelIsHtml?: boolean;
  label: string;
  initialValue?: string;
  required?: boolean;
};

export type SignatureValueType = {
  whoSigned: string;
  base64_image: string;
};

export type SignatureFieldType = FieldCommonType & {
  type: "signature";
  multiple?: boolean;
  disabledInput?: boolean;
  initialValue?: SignatureValueType[];
  optionWhoSign?: string[];
};
export type OptionMultipleChoiceType = {
  label: string;
  styleLabel?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
  checked: boolean;
};

type MultipleChoiceType = FieldCommonType & {
  type: "multiple_choice";
  options: OptionMultipleChoiceType[];
};

type SingleChoiceType = FieldCommonType & {
  type: "single_choice";
  options: RadioButtonProps[];
};

type InputTextNumberType = FieldCommonType & {
  type: "number" | "text";
  placeholder?: string;
};

export type RequiresTextAnswersType = {
  item_name: string;
  value: string;
};

type InputTextAnswerType = FieldCommonType & {
  type: "text_answer";
  placeholder?: string;
  requires?: RequiresTextAnswersType;
};

type FileInputType = FieldCommonType & {
  type: "file";
  multiple?: boolean;
  typeFiles?: "images" | "pdf" | "all";
  initialValue?: FileUploaded[];
  onUploadFiles?: (files: FormData) => {};
  value?: FileUploaded[];
};

export type SchemaFormType = {
  form: FORM_TYPE_SCHEMA_PROPS;
  typesFields: string[];
  propsFields: FieldType[];
};

type FieldInputDate = FieldCommonType & {
  type: "date";
};
type FieldInputDateTime = FieldCommonType & {
  type: "date_time";
};

export type FieldType =
  | MultipleChoiceType
  | SingleChoiceType
  | InputTextNumberType
  | TitleType
  | SignatureFieldType
  | InputTextAnswerType
  | FileInputType
  | FieldInputDateTime
  | FieldInputDate;

type ObjectShapeValues =
  ObjectShape extends Record<string, infer V> ? V : never;
type Shape<T extends Record<any, any>> = Partial<
  Record<keyof T, ObjectShapeValues>
>;
// @ts-ignore
type YupSchema = Yup.ObjectSchema<
  Shape<{
    [key: string]: Yup.Schema<any>;
  }>
>;

export type FORM_TYPE_SCHEMA_PROPS = {
  initialErrors: {
    [key: string]: string;
  };
  initialValues: {
    [key: string]: FieldType["initialValue"];
  };
  labels: {
    [key: string]: string;
  };
  schema: YupSchema;
};

export type CREATE_SCHEMA_FORMS = {
  form: FORM_TYPE_SCHEMA_PROPS;
  propsFields: FieldType[];
};
