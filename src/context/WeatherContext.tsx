import weatherBackgrounds from "@/src/constants/weatherBackgrounds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { ImageRequireSource } from "react-native";
import Toast from "react-native-toast-message";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  bg: ImageRequireSource;
}

export interface WeatherContextType {
  weatherData: WeatherData[] | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

const API_KEY = process.env.EXPO_PUBLIC_API_KEY; // we can use secret storage to keep these keys (to prevent from exposing in de-compiled code)
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherDataArr, setWeatherDataArr] = useState<WeatherData[] | null>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      let weatherData = await AsyncStorage.getItem("weather_data");
      if (weatherData) {
        const parsedData = JSON.parse(weatherData) as WeatherData[];
        setWeatherDataArr(parsedData);
      }
    } catch (error) {
      // console.error("Error loading last searched city:", error);
    }
  };

  const storeWeatherData = useCallback(async (weatherData: WeatherData) => {
    if (!weatherData) {
      return;
    }

    let oldData = await AsyncStorage.getItem("weather_data");

    let newData = [];
    if (oldData) {
      newData = JSON.parse(oldData);
    }

    newData.push(weatherData);
    AsyncStorage.setItem("weather_data", JSON.stringify(newData.slice(0, 10))); // last 10 data
  }, []);

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

      setWeatherDataArr((data) => {
        if (data) {
          return [weatherInfo, ...data];
        }
        return [];
      });
      storeWeatherData(weatherInfo);
    } catch (error) {
      let msg = "City not found. Please try again.";
      setError(msg);
      Toast.show({
        type: "error",
        text1: msg,
        position: "bottom",
        bottomOffset: 100,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData: weatherDataArr,
        loading,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
