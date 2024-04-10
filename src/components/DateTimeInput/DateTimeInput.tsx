import React from "react";
import InputTime from "@components/DateTimeInput/InputTime";
import InputDate from "@components/DateTimeInput/InputDate";
import { PropDate } from "@components/DateTimeInput/types";
import { Box, Text } from "@ui/components";

const DateTimeInput: React.FC<
  PropDate & { typeFormat: "date" | "time" | "date_time" }
> = ({
  typeFormat,
  label,
  labelStyles,
  isRequired,
  containerStyle = {},
  onChange,
  defaultValue,
  ...rest
}) => {
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    if (!defaultValue) return;
    const dateTimeCurrent = defaultValue.split(" ");
    setDate(dateTimeCurrent[0]);
    setTime(dateTimeCurrent[1]);
  }, [defaultValue]);

  React.useEffect(() => {
    if (typeFormat === "date_time" && time && date) {
      onChange?.(`${date} ${time}`);
    }
  }, [time, date]);

  if (typeFormat === "time") {
    return (
      <InputTime
        label={label}
        labelStyles={labelStyles}
        defaultValue={defaultValue}
        isRequired={isRequired}
        onChange={onChange}
        {...rest}
        containerStyle={{ marginVertical: 10 }}
      />
    );
  }
  if (typeFormat === "date") {
    return (
      <InputDate
        label={label}
        labelStyles={labelStyles}
        defaultValue={defaultValue}
        isRequired={isRequired}
        onChange={onChange}
        {...rest}
        containerStyle={{ marginVertical: 10 }}
      />
    );
  }
  return (
    <Box style={{ marginVertical: 10 }}>
      <Text style={labelStyles}>
        {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <InputDate defaultValue={date} onChange={setDate} {...rest} />
        <InputTime defaultValue={time} onChange={setTime} {...rest} />
      </Box>
    </Box>
  );
};
export default DateTimeInput;
