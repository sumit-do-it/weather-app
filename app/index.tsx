import { ThemeProvider } from "@context/ThemeContext";
import { WeatherProvider } from "@context/WeatherContext";
import WeatherScreen from "@screens/WeatherScreen";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WeatherProvider>
          <WeatherScreen />
        </WeatherProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
