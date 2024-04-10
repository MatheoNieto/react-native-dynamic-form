import React from "react";
import { FieldConfig, useField } from "formik";
import { InputFileProps } from "@components/InputFileUploadAutomatic/types";
import { Box, Text } from "@ui/components";
import InputFileUploadAutomatic from "@components/InputFileUploadAutomatic/InputFileUploadAutomatic";

type Props = InputFileProps &
  Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
    required: boolean;
    typeInputFile?: "button" | "container";
  };

const FieldFile: React.FC<Props> = ({
  label,
  name,
  validate,
  value,
  required,
  typeFiles = "all",
  typeInputFile = "container",
}) => {
  const [field] = useField({ name, validate, value });

  const changeFiles = (newValue: string) => {
    // @ts-ignore
    field.onChange(name)(newValue);
  };

  return (
    <Box my="m">
      {label && (
        <Text>
          {label}
          {required && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <Box my="s">
        <InputFileUploadAutomatic
          onChange={changeFiles}
          label={typeInputFile === "button" ? "Upload" : ""}
          typeFiles={typeFiles}
          typeInputFile={typeInputFile}
        />
      </Box>
    </Box>
  );
};

export default FieldFile;
