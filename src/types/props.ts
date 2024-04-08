import { SchemaFormType } from "./schemaForms";
import { ViewStyle } from "react-native";

export type CommonProps = {
  dataFields: SchemaFormType;
  onSubmit: (values: unknown) => void;
  onError?: () => void;
  styleContainerForm?: ViewStyle;
};
