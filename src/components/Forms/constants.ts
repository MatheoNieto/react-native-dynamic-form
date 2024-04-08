import {
  composeRestyleFunctions,
  layout,
  position,
  spacing,
  spacingShorthand,
  visible,
} from "@shopify/restyle";

export const restyleFunctionsField = composeRestyleFunctions([
  visible,
  layout,
  spacing,
  spacingShorthand,
  position,
  layout,
]);
