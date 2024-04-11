import * as Yup from "yup";
import {
  CREATE_SCHEMA_FORMS,
  FieldType,
  FORM_TYPE_SCHEMA_PROPS,
  YupSchema,
} from "@types";
import { validateStringArray } from "@utils/utils";

type TempSchemaType =
  | Yup.StringSchema
  | Yup.MixedSchema
  | Yup.ArraySchema<YupSchema>;
type SchemaFieldTemporalType = {
  [key: string]: TempSchemaType;
};

export const createSchemasForms = (
  fields: FieldType[],
): CREATE_SCHEMA_FORMS | undefined => {
  if (!fields.length) return undefined;

  const dataFields: FORM_TYPE_SCHEMA_PROPS = {
    initialValues: {},
    initialErrors: {},
    labels: {},
    schema: Yup.object().shape({}),
  };

  const schemaFieldsTemporal: SchemaFieldTemporalType = {};

  fields.forEach((field, index) => {
    let loadInitialValue = undefined;
    const isFieldChoose = field.type.includes("choice");
    let tempSchema: TempSchemaType = isFieldChoose ? Yup.mixed() : Yup.string();

    if (field.initialValue) {
      // const isTable = field.type === "table";

      const isTable = false;
      const isRadioButton = field.type === "single_choice";
      const valueCurrentField = field.initialValue;
      const isArrayString = validateStringArray(valueCurrentField);
      const dataRadioButton =
        isRadioButton && valueCurrentField
          ? valueCurrentField[0]
          : valueCurrentField;
      const shouldBeArray = isArrayString ? dataRadioButton : valueCurrentField;

      loadInitialValue = isTable ? [] : shouldBeArray;
    }

    if (isFieldChoose && field.type === "single_choice") {
      // @ts-ignore
      tempSchema.oneOf([...(field.options as const)], "Selecting");
    }

    if (field.required) {
      tempSchema.required("This field is mandatory");
      dataFields.initialErrors[field.name] = "This field is mandatory";
    }

    if (field.type === "signature") {
      const dataSchemaSignature = schemaSignature(field.required);
      schemaFieldsTemporal[field.name] = dataSchemaSignature.schema;
      dataFields.initialValues[field.name] = dataSchemaSignature.initialValue;
    } else {
      dataFields.initialValues[field.name] = field.initialValue;
      dataFields.labels[field.name] = field.name;
      schemaFieldsTemporal[field.name] = tempSchema;
    }
  });

  return {
    form: {
      ...dataFields,
      schema: Yup.object().shape(schemaFieldsTemporal),
    },
    propsFields: fields,
  };
};

export const schemaSignature = (isMandatory = false) => {
  return {
    schema: Yup.array().of(
      Yup.object().shape({
        whoSigned: Yup.string().nonNullable(),
        base64_image: Yup.string().nonNullable(),
      }),
    ),
    initialValue: [
      {
        whoSigned: isMandatory ? null : "",
        base64_image: isMandatory ? null : "",
      },
    ],
  };
};
