import React, { useState } from "react";
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
import { WeatherProvider, useWeather } from "../context/WeatherContext";

const WeatherScreen = () => {
  const [cityInput, setCityInput] = useState("");
  const { weatherData, loading, error, fetchWeather } = useWeather();

  const handleSearch = () => {
    if (cityInput.trim()) {
      Keyboard.dismiss();
      fetchWeather(cityInput.trim());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        {loading && !weatherData ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
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
      <View style={[styles.searchContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const App = () => {
  return (
    <WeatherProvider>
      <WeatherScreen />
    </WeatherProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: "white", // Needed for Android shadow
    padding: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 15,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 0.75,
    borderColor: "#E3E3E3",
  },
  button: {
    backgroundColor: "#007AFF",
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
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;
