import useThemeColors from "@hooks/useThemeColors";
import { useMemo } from "react";
import { Platform } from "react-native";

export default () => {
  const themeColors = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: themeColors.background,
      },
      text: {
        color: themeColors.text,
      },
      input: {
        backgroundColor: themeColors.inputBackground,
        color: themeColors.inputText,
        borderColor: themeColors.inputBorder,
      },
      searchContainer: {
        backgroundColor: themeColors.background,
        ...Platform.select({
          ios: {
            shadowColor: themeColors.shadowColor,
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: themeColors.shadowOpacity,
            shadowRadius: 1,
          },
          android: {
            borderTopWidth: 1,
            borderTopColor: themeColors.borderColor,
          },
        }),
      },
      themeIcon: themeColors.icon,
    };
  }, [themeColors]);

  return dynamicStyles;
};
