import React from "react";
import RadioGroup, { RadioGroupProps } from "react-native-radio-buttons-group";
import { palette } from "@theme";
import { Text } from "@ui/components";

export type RadioButtonProps = RadioGroupProps & {
  onChange?: (selected: string) => void;
  isRow?: boolean;
  title: string;
  isRequired?: boolean;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  title,
  selectedId,
  isRow = false,
  radioButtons,
  onChange,
  isRequired,
}) => {
  const [currentSelected, setCurrentSelected] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    setCurrentSelected(selectedId);
  }, [selectedId]);

  const handleChange = (newValue: string) => {
    setCurrentSelected(newValue);
    onChange && onChange(newValue);
  };

  return (
    <>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 14,
          color: palette.black,
          textTransform: "capitalize",
        }}
      >
        {title} {isRequired && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <RadioGroup
        radioButtons={radioButtons.map((radio) => ({
          ...radio,
          color: palette.primary100,
          size: 17,
          labelStyle: { marginHorizontal: 15 },
        }))}
        onPress={handleChange}
        selectedId={currentSelected}
        layout={isRow ? "row" : "column"}
        containerStyle={{ alignItems: "flex-start" }}
      />
    </>
  );
};
export default RadioButton;
