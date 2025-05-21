import { WeatherCard } from "@components/WeatherCard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@hooks/useTheme";
import { useWeather } from "@hooks/useWeather";
import useThemeStyles from "@hooks/useWeatherThemeStyles";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {__DEV__ ? (
        <Text style={styles.testText} testID="theme-text">
          {isDark}
        </Text>
      ) : null}
      <View style={[styles.searchContainer, themeStyles.searchContainer]}>
        <TextInput
          testID="city-input"
          style={[styles.input, themeStyles.input]}
          placeholder="Enter city name"
          placeholderTextColor={themeColors.inputPlaceholder}
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          testID="search-button"
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        {loading && !weatherData?.length ? (
          <ActivityIndicator
            size="large"
            color={themeColors.activityIndicator}
          />
        ) : weatherData?.length ? (
          <WeatherCard
            city={weatherData[0]?.city}
            temperature={weatherData[0]?.temperature}
            condition={weatherData[0]?.condition}
            icon={weatherData[0]?.icon}
            bg={weatherData[0]?.bg}
          />
        ) : null}
      </Pressable>
      <View style={styles.header}>
        <TouchableOpacity
          testID="theme-toggle-button"
          onPress={toggleTheme}
          style={styles.themeButton}
        >
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={themeStyles.themeIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    padding: 16,
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
    // marginBottom: 20,
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
  testText: {
    opacity: 0,
    position: "absolute",
    visibility: "hidden",
  },
});
