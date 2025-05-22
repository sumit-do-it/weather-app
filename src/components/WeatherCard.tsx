import { Colors } from "@/src/constants/Colors";
import { useTheme } from "@hooks/useTheme";
import { WeatherData } from "@typings/weatherData.type";
import { formatDate } from "@utils/dateFornatter";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const WeatherCard: React.FC<WeatherData> = ({
  city,
  temperature,
  condition,
  icon,
  createdAt,
}) => {
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  return (
    <View
      style={[styles.card, { borderColor: themeColors.inputBorder }]}
      testID="background-image"
    >
      <View style={styles.leftContainer}>
        {createdAt ? (
          <Text numberOfLines={1} style={styles.time} testID="time-text">
            {formatDate(createdAt)}
          </Text>
        ) : null}
        <Text numberOfLines={1} style={styles.city} testID="city-text">
          {city}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {icon ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : null}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.temperature} testID="temp-text">
          {temperature}°C
        </Text>
        <Text style={styles.condition} testID="condition-text">
          {condition}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    height: 140,
    overflow: "hidden",
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    marginBottom: 2,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 70,
    height: 70,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  temperature: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  condition: {
    fontSize: 18,
    color: "white",
    textAlign: "right",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    alignSelf: "flex-end",
  },
});
