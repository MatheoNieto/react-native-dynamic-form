import { useColorScheme } from "react-native";

export default function useDarkMode() {
  const theme = "Light";
  const systemTheme = useColorScheme() === "dark";

  switch (theme) {
    case "Light":
      return false;
    default:
      return systemTheme;
  }
}
