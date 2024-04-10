import React, { createRef, useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useCombinedRefs } from "@ui/hooks";
import { PropDate } from "@components/DateTimeInput/types";
import { formatDate } from "@utils/format";
import { BaseTouchable, Box, Text } from "@ui/components";
import { TextInput, ViewStyle } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { palette } from "@theme";
import dayjs from "dayjs";

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
    const newDate = formatDate(selectedDateText, formatted);
    onChange?.(selectedDateText);
    setSelectedDate(dayjs(newDate).toDate);
  }, [selectedDateText]);

  const showOrHideDatePicker = (show: boolean = true) => {
    setIsDatePickerVisible(show);
  };

  const handleConfirm = (date: Date) => {
    const dateText = formatDate(date, formatted);
    setSelectedDateText(dateText);
    showOrHideDatePicker(false);
  };
  const handleChange = (date: string) => {
    setSelectedDateText(date);
  };

  return (
    <Box style={{ ...containerStyle }}>
      {label && (
        <Text style={labelStyles}>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <BaseTouchable
        style={{ ...containerStyle }}
        onPress={() => inputDateRef?.current?.focus()}
      >
        <Box>
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
