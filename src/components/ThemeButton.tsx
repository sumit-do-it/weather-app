import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemeButton = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <TouchableOpacity testID="theme-toggle-button" onPress={toggleTheme}>
      <Ionicons name={isDark ? "sunny" : "moon"} size={24} color={"white"} />
    </TouchableOpacity>
  );
};

export default memo(ThemeButton);
