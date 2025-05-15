import { ThemeProvider } from "@context/ThemeContext";
import { WeatherProvider } from "@context/WeatherContext";
import { render } from "@testing-library/react-native";
import React from "react";

const renderWithProviders = (ui, options) =>
  render(
    <ThemeProvider>
      <WeatherProvider>{ui}</WeatherProvider>
    </ThemeProvider>,
    options
  );

export * from "@testing-library/react-native";
export { renderWithProviders as render };
