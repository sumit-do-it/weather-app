import { ImageRequireSource } from "react-native";

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: ImageRequireSource;
  createdAt: string;
}
