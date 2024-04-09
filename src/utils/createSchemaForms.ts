import * as Yup from "yup";
import { CREATE_SCHEMA_FORMS, FieldType, FORM_TYPE_SCHEMA_PROPS } from "@types";

type TempSchemaType = Yup.StringSchema | Yup.MixedSchema;
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
    const isFieldChoose = field.type.includes("choice");
    let tempSchema: TempSchemaType = isFieldChoose ? Yup.mixed() : Yup.string();

    if (field.initialValue) {
      dataFields.initialValues[field.name] = field.initialValue;
    }

    if (isFieldChoose && field.type === "single_choice") {
      // @ts-ignore
      tempSchema.oneOf([...(field.options as const)], "Selecting");
    }

    if (field.required) {
      tempSchema.required("This field is mandatory");
      dataFields.initialErrors[field.name] = "This field is mandatory";
    }

    dataFields.labels[field.name] = field.name;
    schemaFieldsTemporal[field.name] = tempSchema;
  });

  return {
    form: {
      ...dataFields,
      schema: Yup.object().shape(schemaFieldsTemporal),
    },
    propsFields: fields,
  };
};
