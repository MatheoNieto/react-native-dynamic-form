import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type PropDate = {
  icon?: boolean;
  inputStyles?: StyleProp<TextStyle>;
  onChange?: (text: string) => void;
  placeholder?: string;
  label?: string;
  labelStyles?: TextStyle;
  containerStyle?: ViewStyle;
  defaultValue?: string;
  isRequired?: boolean;
};
