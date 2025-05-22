import useThemeColors from "@hooks/useThemeColors";
import { useMemo } from "react";

export default () => {
  const themeColors = useThemeColors();

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: themeColors.background,
      },
    };
  }, [themeColors]);

  return dynamicStyles;
};
