import React, { useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment/moment";
const InputTime: React.FC<PropInputDate & { styleField?: ViewStyle }> = ({
  label,
  labelStyles,
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
    <View style={{ ...containerStyle }}>
      {label && (
        <Text style={[styles.labelInput, labelStyles]}>
          {label} {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={() => inputTimeRef?.current?.focus()}>
        <View style={{ ...styles.contentInput }}>
          <MaskInput
            value={selectedTimeText}
            style={[styles.input, styleField]}
            ref={refs}
            onChangeText={(text) => handleChange(text)}
            keyboardType="numeric"
            placeholder={"_:_"}
            mask={[/\d/, /\d/, ":", /\d/, /\d/]}
          />
          {icon && (
            <TouchableWithoutFeedback onPress={() => showOrHidePicker(true)}>
              <Ionicons
                name="time-sharp"
                size={24}
                color={theme.color.blue}
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>

      <DateTimePicker
        date={new Date(`${currentDate} ${selectedTime}`)}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showOrHidePicker(false)}
      />
    </View>
  );
};

export default InputTime;
