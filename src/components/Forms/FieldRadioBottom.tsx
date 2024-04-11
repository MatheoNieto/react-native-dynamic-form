import React from "react";
import { FieldConfig, useField } from "formik";
import ErrorMessage from "@components/Forms/ErrorMessage";
import RadioButton, { RadioButtonProps } from "@components/RadioButton";
import { Box } from "@ui/components";

export type Props = RadioButtonProps &
  Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
    labelHTML?: boolean;
    isRequired?: boolean;
    defaultValue?: string;
  };
const FieldRadioBottom: React.FC<Props> = ({
  name,
  labelHTML,
  validate,
  value,
  defaultValue,
  title,
  isRequired,
  onChange,
  ...rest
}) => {
  const [field, meta] = useField({ name, validate, value, defaultValue });
  const isInvalid = Boolean(meta.touched && meta.error);

  const handleChange = React.useCallback((value: string) => {
    onChange?.(value);
    // @ts-ignore
    field.onChange(name)(value);
  }, []);

  return (
    <Box my="s">
      <RadioButton
        title={title}
        selectedId={defaultValue}
        onChange={handleChange}
        isRequired={isRequired}
        {...rest}
      />
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Box>
  );
};

export default FieldRadioBottom;
