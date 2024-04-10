import React, { useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useCombinedRefs } from "@ui/hooks";
import { TextInput, ViewStyle } from "react-native";
import { PropDate } from "@components/DateTimeInput/types";
import { BaseTouchable, Box, Text } from "@ui/components";
import { MaskInput } from "@components/MaskInput";
import moment from "moment";

const InputTime: React.FC<PropDate & { styleField?: ViewStyle }> = ({
  label,
  icon,
  onChange,
  containerStyle,
  defaultValue = "",
  isRequired,
  styleField = {},
}) => {
  const inputTimeRef = React.createRef<TextInput | null>();
  const refs = useCombinedRefs(inputTimeRef);

  const [isTimePickerVisible, setIsTimePickerVisible] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    undefined,
  );
  const [selectedTimeText, setSelectedTimeText] = React.useState<string>("");
  const formatTime = "HH:mm";
  const currentDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    setSelectedTimeText(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    if (selectedTimeText === "") {
      setSelectedTime(undefined);
      onChange?.(selectedTimeText);
      return;
    }

    onChange?.(selectedTimeText);
    setSelectedTime(selectedTimeText);
  }, [selectedTimeText]);

  const showOrHidePicker = (show: boolean = false) => {
    setIsTimePickerVisible(show);
  };
  const handleConfirm = (time: Date) => {
    const dateText = moment(time).format(formatTime);
    setSelectedTimeText(dateText);
    showOrHidePicker(false);
  };
  const handleChange = (time: string) => {
    setSelectedTimeText(time);
  };

  return (
    <Box style={{ ...containerStyle }}>
      {label && (
        <Text>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <BaseTouchable onPress={() => inputTimeRef?.current?.focus()}>
        <Box>
          <MaskInput
            value={selectedTimeText}
            style={styleField}
            ref={refs}
            onChangeText={(text) => handleChange(text)}
            keyboardType="numeric"
            placeholder={"_:_"}
            mask={[/\d/, /\d/, ":", /\d/, /\d/]}
          />
          {icon && (
            <BaseTouchable onPress={() => showOrHidePicker(true)}>
              <Ionicons name="time-sharp" size={24} />
            </BaseTouchable>
          )}
        </Box>
      </BaseTouchable>

      <DateTimePicker
        date={new Date(`${currentDate} ${selectedTime}`)}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showOrHidePicker(false)}
      />
    </Box>
  );
};

export default InputTime;
