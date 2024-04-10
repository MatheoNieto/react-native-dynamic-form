import React from "react";
import { FieldConfig, useField } from "formik";
import ErrorMessage from "@components/Forms/ErrorMessage";
import Checkbox, { PropsCheckbox } from "@components/Checkbox";

export type Props = PropsCheckbox &
  Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
    isRequired?: boolean;
    defaultValue?: string[];
  };
const FieldCheckbox: React.FC<Props> = ({
  name,
  validate,
  value,
  defaultValue,
  title,
  isRequired,
  options,
  onChange,
}) => {
  const [field, meta] = useField({ name, validate, value, defaultValue });
  const isInvalid = Boolean(meta.touched && meta.error);

  const handleChange = React.useCallback((value: string[]) => {
    onChange?.(value);
    // @ts-ignore
    field.onChange(name)(value.length > 0 ? JSON.stringify(value) : "");
  }, []);

  return (
    <>
      <Checkbox
        title={title}
        onChange={handleChange}
        options={options}
        isRequired={isRequired}
        defaultValue={defaultValue}
      />
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

export default FieldCheckbox;
