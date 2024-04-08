import React from "react";
import { SchemaFormType } from "@types";
import { Button } from "@ui/components";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import { FieldInput } from "@components/Forms";

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
