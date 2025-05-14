import { Colors } from "@constants/Colors";
import { useTheme } from "../context/ThemeContext";

export default () => {
  const { isDark } = useTheme();
  return isDark ? Colors.dark : Colors.light;
};
