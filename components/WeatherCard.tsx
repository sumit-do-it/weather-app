import React from "react";
import {
  ImageBackground,
  ImageRequireSource,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  bg: ImageRequireSource;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  icon,
  bg,
}) => {
  return (
    <ImageBackground source={bg} style={styles.card} resizeMode="cover">
      <View style={styles.leftContainer}>
        <Text numberOfLines={1} style={styles.city}>
          {city}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 140,
    overflow: "hidden",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
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
    alignSelf: "flex-end",
  },
});
