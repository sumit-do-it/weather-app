import { useWeather } from "@hooks/useWeather";
import { WeatherData } from "@typings/weatherData.type";
import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { WeatherCard } from "./WeatherCard";

const WeatherCardList = () => {
  const { weatherData } = useWeather();

  const renderItem = useCallback(
    ({ item, index }: { item: WeatherData; index: number }) => {
      return <WeatherCard {...item} />;
    },
    []
  );

  const separator = useCallback(() => {
    return <View style={styles.separatorView} />;
  }, []);

  if (!weatherData || !weatherData?.length) {
    return null;
  }

  return (
    <FlatList
      data={weatherData}
      renderItem={renderItem}
      ItemSeparatorComponent={separator}
      keyExtractor={(item, i) => item.city + i}
      style={styles.listStyle}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default memo(WeatherCardList);

const styles = StyleSheet.create({
  listStyle: { flex: 1 },
  contentContainerStyle: { paddingVertical: 8 },
  separatorView: {
    height: 0.4,
    backgroundColor: "white",
  },
});
