import weatherBackgrounds from "@/constants/weatherBackgrounds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ImageRequireSource } from "react-native";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  bg: ImageRequireSource;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = "c5cc679c46f97cc3c56888c6aefa23be"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLastSearchedCity();
  }, []);

  const loadLastSearchedCity = async () => {
    try {
      const city = await AsyncStorage.getItem("lastSearchedCity");
      if (city) {
        fetchWeather(city);
      }
    } catch (error) {
      console.error("Error loading last searched city:", error);
    }
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });

      const data = response?.data;
      const weatherInfo: WeatherData = {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        bg:
          weatherBackgrounds[data.weather[0]?.main] ??
          weatherBackgrounds.Default,
      };

      setWeatherData(weatherInfo);
      await AsyncStorage.setItem("lastSearchedCity", city);
    } catch (error) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
