import React from "react";
import Checkbox from "react-native-check-box";

import { FlatList, TextStyle, ViewStyle } from "react-native";
import { palette } from "@theme";
import { Box, Text } from "@ui/components";
import { OptionMultipleChoiceType } from "@types";

export type OptionCheckbox = {
  label: string;
  styleLabel?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
  checked: boolean;
};

export type PropsCheckbox = {
  options: OptionMultipleChoiceType[];
  colorChecked?: string;
  colorUnchecked?: string;
  onChange?: (optionSelected: string[]) => void;
  title: string;
  isRequired?: boolean;
  defaultValue?: string[];
};
const CheckboxComponent: React.FC<PropsCheckbox> = ({
  options,
  defaultValue = [],
  isRequired,
  title,
  onChange,
  colorChecked = palette.primaryBlue,
  colorUnchecked = palette.primaryBlue,
}) => {
  const [optionSelected, setOptionSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      setOptionSelected(defaultValue);
    } else {
      setOptionSelected([]);
    }
  }, []);

  const changeSelected = (currentSelected: string) => {
    const indexIfIsSelected = optionSelected?.find(
      (item) => item === currentSelected,
    );
    let dataOptionsChanged = optionSelected;
    if (!indexIfIsSelected) {
      dataOptionsChanged.push(currentSelected);
    } else {
      dataOptionsChanged = dataOptionsChanged.filter(
        (item) => item !== currentSelected,
      );
    }
    setOptionSelected(dataOptionsChanged);
    onChange?.(dataOptionsChanged);
  };

  const renderItem = ({ item }: { item: OptionCheckbox }) => {
    return (
      <Checkbox
        onClick={() => changeSelected(item.label)}
        rightText={item.label}
        rightTextStyle={{
          marginVertical: 4,
          fontSize: 14,
          color: palette.black,
        }}
        isChecked={optionSelected.includes(item.label)}
        disabled={item.disabled}
        checkBoxColor={colorChecked}
        uncheckedCheckBoxColor={colorUnchecked}
      />
    );
  };

  const memoizedValue = React.useMemo(
    () => renderItem,
    [optionSelected, options],
  );

  return (
    <Box>
      <Text variant="label">
        {title}
        {isRequired && <Text style={{ color: palette.error500 }}>*</Text>}
      </Text>
      <FlatList
        data={options}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => `checkbox-${item.label}-${index}`}
        scrollEnabled={false}
        nestedScrollEnabled={false}
      />
    </Box>
  );
};

export default CheckboxComponent;
