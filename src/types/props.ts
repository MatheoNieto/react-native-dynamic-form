import { ViewStyle } from "react-native";

export type CommonProps = {
  onSubmit: (values: unknown) => void;
  onError?: () => void;
  styleContainerForm?: ViewStyle;
  labelButtonSubmit: string;
};
