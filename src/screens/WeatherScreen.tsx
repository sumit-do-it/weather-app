import { WeatherCard } from "@components/WeatherCard";
import { useTheme } from "@context/ThemeContext";
import { useWeather } from "@context/WeatherContext";
import { Ionicons } from "@expo/vector-icons";
import useThemeStyles from "@hooks/useWeatherThemeStyles";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useThemeColors from "../hooks/useThemeColors";

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const { isDark, toggleTheme } = useTheme();
  const themeColors = useThemeColors();
  const themeStyles = useThemeStyles();

  const handleSearch = useCallback(() => {
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  }, [cityInput, fetchWeather]);

  useEffect(() => {
    if (weatherData) {
      Keyboard.dismiss();
    }
  }, [weatherData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, themeStyles.container]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={themeStyles.themeIcon}
          />
        </TouchableOpacity>
      </View>
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        {loading && !weatherData ? (
          <ActivityIndicator
            size="large"
            color={themeColors.activityIndicator}
          />
        ) : error ? (
          <Text style={[styles.error, { color: themeColors.error }]}>
            {error}
          </Text>
        ) : weatherData ? (
          <WeatherCard
            city={weatherData.city}
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            icon={weatherData.icon}
            bg={weatherData.bg}
          />
        ) : null}
      </Pressable>
      <View style={[styles.searchContainer, themeStyles.searchContainer]}>
        <TextInput
          style={[styles.input, themeStyles.input]}
          placeholder="Enter city name"
          placeholderTextColor={themeColors.inputPlaceholder}
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default memo(WeatherScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 16,
    paddingTop: 16,
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 8,
    zIndex: 100,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 0.75,
  },
  button: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
