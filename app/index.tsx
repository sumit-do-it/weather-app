import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
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
import { WeatherCard } from "../components/WeatherCard";
import { Colors } from "../constants/Colors";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { WeatherProvider, useWeather } from "../context/WeatherContext";

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const { weatherData, loading, error, fetchWeather } = useWeather();
  const { isDark, toggleTheme } = useTheme();
  const themeColors = isDark ? Colors.dark : Colors.light;

  const handleSearch = () => {
    if (cityInput.trim()) {
      // Keyboard.dismiss();
      fetchWeather(cityInput.trim());
    }
  };

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
    };
  }, [themeColors]);

  useEffect(() => {
    if (weatherData) {
      Keyboard.dismiss();
    }
  }, [weatherData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, dynamicStyles.container]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={themeColors.icon}
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
      <View style={[styles.searchContainer, dynamicStyles.searchContainer]}>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
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

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherScreen />
      </WeatherProvider>
    </ThemeProvider>
  );
};

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

export default App;
