import weatherIcons from "@constants/weatherIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData } from "@typings/weatherData.type";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export interface WeatherContextType {
  weatherData: WeatherData[] | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<boolean>;
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
      newData = JSON.parse(oldData)?.filter(
        (item) => item.city != weatherData.city
      );
    }

    newData.unshift(weatherData);
    AsyncStorage.setItem("weather_data", JSON.stringify(newData.slice(0, 10))); // last 10 data
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    let weatherDataFound = false;
    try {
      if (!BASE_URL) {
        throw "Weather Api is not found";
      }
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
        icon:
          weatherIcons[data.weather[0]?.main as keyof typeof weatherIcons] ||
          weatherIcons["Default"],
        createdAt: new Date().toUTCString(),
      };

      setWeatherDataArr((data) => {
        if (data) {
          let fileredData = data.filter(
            (item) => item.city != weatherInfo.city
          );
          return [weatherInfo, ...fileredData];
        }
        return [];
      });
      storeWeatherData(weatherInfo);
      weatherDataFound = true;
    } catch (error) {
      let msg = "City not found. Please try again.";
      setError(msg);
      setTimeout(() => {
        Toast.show({
          type: "error",
          text1: msg,
          position: "bottom",
        });
      }, 300);
    } finally {
      setLoading(false);
    }
    return weatherDataFound;
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
