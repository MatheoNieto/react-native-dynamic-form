import React from "react";
import { SchemaFormType } from "@types";
import { Button, Text } from "@ui/components";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import { FieldInput } from "@components/Forms";
import RenderHtlm from "@components/RenderHtlm";
import FieldsSignature from "@components/Forms/FieldsSignature";

type Props = {
  dataFields: SchemaFormType;
  labelButtonSubmit: string;
};

const ManagerInput: React.FC<Props> = ({ dataFields, labelButtonSubmit }) => {
  type SchemaFormType = Yup.InferType<typeof dataFields.form.schema>;
  const { isValid, handleSubmit } = useFormikContext<SchemaFormType>();
  return (
    <>
      {dataFields.propsFields.map((itemField, index) => {
        if (itemField.type === "signature") {
          return (
            <FieldsSignature
              key={`${index}field-signature-${itemField.name}`}
              name={itemField.name}
              label={itemField.label === "" ? "Signature" : itemField.label}
              required={itemField.required}
              multiple={itemField.multiple}
            />
          );
        }

        if (itemField.type === "title") {
          return (
            <>
              {itemField.labelIsHtml ? (
                <RenderHtlm
                  key={`${index}title-html-${itemField.name}`}
                  content={itemField.label}
                />
              ) : (
                <Text
                  key={`${index}title-${itemField.name}`}
                  variant="headerBold"
                >
                  {itemField.label}
                </Text>
              )}
            </>
          );
        }

        if (itemField.type === "text") {
          return (
            <FieldInput
              key={`input-${itemField.name}-${index}`}
              isRequired
              name={itemField.name}
              placeholder={itemField.placeholder}
              label={itemField.label}
              returnKeyType="next"
              mt="m"
            />
          );
        }
        return null;
      })}
      <Button
        mt="s"
        mb="xl"
        isDisabled={!isValid}
        onPress={handleSubmit.bind(null, undefined)}
      >
        {labelButtonSubmit}
      </Button>
    </>
  );
};

export default ManagerInput;
