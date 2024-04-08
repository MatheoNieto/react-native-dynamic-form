import * as Yup from "yup";
import { CREATE_SCHEMA_FORMS, FieldType, FORM_TYPE_SCHEMA_PROPS } from "@types";
import { validateStringArray } from "@utils/utils";

export const createSchemasForms = (
  fields: FieldType[],
): CREATE_SCHEMA_FORMS | undefined => {
  if (!fields.length) return undefined;

  const dataFields: FORM_TYPE_SCHEMA_PROPS = {
    initialValues: {},
    initialErrors: {},
    labels: {},
    schema: {},
  };

  const schemaFieldsTemporal: any = {};
  const typesFields: string[] = [];

  fields.forEach((field, index) => {
    const isFieldChoose = field.type.includes("choice");
    const valueCurrentField = field.initialValue;
    let tempSchema = isFieldChoose ? Yup.mixed() : Yup.string();

    if (field.initialValue) {
      dataFields.initialValues[`${field.id}`];
    }

    if (isFieldChoose && field.type === "single_choice") {
      tempSchema.oneOf([...(field.options as const)], "Selecting");
    }

    if (field.required) {
      tempSchema.required("This field is mandatory");
      dataFields.initialErrors[`${field.name}`] = "This field is mandatory";
    }
  });

  return {
    form: {
      ...dataFields,
      schema: Yup.object().shape(schemaFieldsTemporal),
    },
    typesFields,
    propsFields: {},
  };
};
