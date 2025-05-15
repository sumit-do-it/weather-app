import { Colors } from "@constants/Colors";
import { useTheme } from "@hooks/useTheme";

export default () => {
  const { isDark } = useTheme();
  return isDark ? Colors.dark : Colors.light;
};
