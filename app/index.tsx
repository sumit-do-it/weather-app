import { ThemeProvider } from "@context/ThemeContext";
import { WeatherProvider } from "@context/WeatherContext";
import WeatherScreen from "@screens/WeatherScreen";
import React from "react";

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherScreen />
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
