import React, { createRef, useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useCombinedRefs } from "@ui/hooks";
import { PropDate } from "@components/DateTimeInput/types";
import { BaseTouchable, Box, Text } from "@ui/components";
import { TextInput, ViewStyle } from "react-native";
import { palette } from "@theme";
import { MaskInput, Masks } from "@components/MaskInput";
import moment from "moment";

const InputDate: React.FC<PropDate & { styleField?: ViewStyle }> = ({
  label,
  labelStyles,
  icon,
  onChange,
  containerStyle,
  defaultValue = "",
  isRequired,
  styleField = {},
}) => {
  const inputDateRef = createRef<TextInput | null>();
  const refs = useCombinedRefs(inputDateRef);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateText, setSelectedDateText] = useState<string>("");
  const formatted = "DD/MM/YYYY";

  useEffect(() => {
    setSelectedDateText(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (selectedDateText === "") {
      setSelectedDate(undefined);
      onChange?.(selectedDateText);
      return;
    }
    const newDate = moment(selectedDateText, formatted, true);
    const isValid = newDate.isValid();
    if (isValid) {
      onChange?.(selectedDateText);
      setSelectedDate(newDate.toDate());
    }
  }, [selectedDateText]);

  const showOrHideDatePicker = (show: boolean = true) => {
    setIsDatePickerVisible(show);
  };

  const handleConfirm = (date: Date) => {
    const dateText = moment(date).format(formatted);
    setSelectedDateText(dateText);
    showOrHideDatePicker(false);
  };
  const handleChange = (date: string) => {
    setSelectedDateText(date);
  };

  return (
    <Box style={{ ...containerStyle }}>
      {label && (
        <Text variant="label" style={labelStyles}>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <BaseTouchable
        style={{ ...containerStyle }}
        onPress={() => inputDateRef?.current?.focus()}
      >
        <Box
          width="100%"
          p="m"
          pr="s"
          borderWidth={0.2}
          flexDirection="row"
          alignItems="center"
          borderColor="inputBorder"
          justifyContent="space-between"
          bg="input"
          borderRadius="s"
        >
          <MaskInput
            value={selectedDateText}
            style={styleField}
            ref={refs}
            onChangeText={(text) => handleChange(text)}
            keyboardType="numeric"
            mask={Masks.DATE_DDMMYYYY}
            placeholder="_/_/_"
          />
          {icon && (
            <BaseTouchable onPress={() => showOrHideDatePicker(true)}>
              <Ionicons name="calendar" size={24} color={palette.primaryBlue} />
            </BaseTouchable>
          )}
        </Box>
      </BaseTouchable>

      <DateTimePicker
        date={selectedDate}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => showOrHideDatePicker(false)}
      />
    </Box>
  );
};
export default InputDate;
