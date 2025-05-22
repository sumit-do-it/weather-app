import CitySearchBar from "@components/CitySearchBar";
import ThemeButton from "@components/ThemeButton";
import WeatherCardList from "@components/WeatherCardList";
import { useTheme } from "@hooks/useTheme";
import useThemeColors from "@hooks/useThemeColors";
import { useWeather } from "@hooks/useWeather";
import useThemeStyles from "@hooks/useWeatherThemeStyles";
import React, { memo, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const backgrounds = {
  light: require("@assets/images/light_theme.webp"),
  dark: require("@assets/images/dark_theme.webp"),
};

const WeatherScreen = () => {
  const insets = useSafeAreaInsets();
  const { weatherData, loading } = useWeather();
  const { isDark, theme } = useTheme();
  const themeColors = useThemeColors();
  const themeStyles = useThemeStyles();

  useEffect(() => {
    if (weatherData) {
      Keyboard.dismiss();
    }
  }, [weatherData]);

  return (
    <View style={[styles.container, themeStyles.container]}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      {__DEV__ ? (
        <Text style={styles.testText} testID="theme-text">
          {isDark}
        </Text>
      ) : null}
      <Image
        source={backgrounds[theme]}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Weather</Text>
          <ThemeButton />
        </View>
        <CitySearchBar style={styles.inputContainer} />
        {loading && !weatherData?.length ? (
          <ActivityIndicator
            size="large"
            color={themeColors.activityIndicator}
          />
        ) : weatherData?.length ? (
          <WeatherCardList />
        ) : null}
      </View>
    </View>
  );
};
export default memo(WeatherScreen);

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("window").height,
    // width: Dimensions.get("window").width,
    flex: 1,
  },
  testText: {
    opacity: 0,
    position: "absolute",
    visibility: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingLeft: 8,
    paddingBottom: 8,
  },
  heading: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "arial",
    paddingLeft: 16,
    color: "white",
  },
  inputContainer: {
    margin: 8,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
