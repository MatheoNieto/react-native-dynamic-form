import { TextStyle } from "react-native";

function useFontStyle({
  fontFamily,
  fontWeight,
}: Pick<TextStyle, "fontFamily" | "fontWeight">) {
  if (!fontFamily) {
    return null;
  }
  return {
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  };
}

export default useFontStyle;
