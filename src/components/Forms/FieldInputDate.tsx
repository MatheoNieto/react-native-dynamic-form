import React from "react";
import { FieldConfig, useField } from "formik";
import ErrorMessage from "@components/Forms/ErrorMessage";
import { PropDate } from "@components/DateTimeInput/types";
import { DateTimeInput } from "@components/DateTimeInput";
import { formatDate } from "@utils/format";
import moment from "moment";

export type Props = PropDate &
  Pick<FieldConfig<any>, "name" | "validate" | "value"> & {
    isRequired?: boolean;
    typeFormat: "date" | "time" | "date_time";
    defaultValue?: string;
  };
const FieldInputDate: React.FC<Props> = ({
  name,
  validate,
  value,
  isRequired,
  onChange,
  label,
  defaultValue,
  typeFormat = "date",
}) => {
  const [field, meta] = useField({ name, validate, value, defaultValue: "" });
  const [defaultValueDateOrTime, setDefaultValueDateOrTime] =
    React.useState<string>();
  const isInvalid = Boolean(meta.touched && meta.error);

  React.useEffect(() => {
    if (defaultValue) {
      if (typeFormat === "date") {
        const dateDefaultValue = formatDate(defaultValue);
        return setDefaultValueDateOrTime(dateDefaultValue);
      }

      if (typeFormat === "time") {
        const timeDefaultValue = formatDate(defaultValue, true);
        return setDefaultValueDateOrTime(timeDefaultValue);
      }
    }

    const dateTimeCurrent = moment().format("DD/MM/YYYY HH:mm:ss");
    const getTimeOrDate = dateTimeCurrent.split(" ");

    if (typeFormat === "date") {
      return setDefaultValueDateOrTime(getTimeOrDate[0]);
    }
    if (typeFormat === "time") {
      return setDefaultValueDateOrTime(getTimeOrDate[1]);
    }
    setDefaultValueDateOrTime(dateTimeCurrent);
  }, [defaultValue]);

  const handleChange = React.useCallback((newDate: string) => {
    onChange?.(newDate);
    // @ts-ignore
    field.onChange(name)(newDate);
  }, []);

  return (
    <>
      <DateTimeInput
        isRequired={isRequired}
        label={label}
        defaultValue={defaultValueDateOrTime}
        typeFormat={typeFormat}
        icon
        onChange={handleChange}
        containerStyle={{ marginVertical: 15, width: "100%" }}
      />
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};
export default FieldInputDate;
