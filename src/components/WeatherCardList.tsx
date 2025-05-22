import { useWeather } from "@hooks/useWeather";
import { WeatherData } from "@typings/weatherData.type";
import React, { memo, useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { WeatherCard } from "./WeatherCard";

const WeatherCardList = () => {
  const { weatherData, loading } = useWeather();

  const renderItem = useCallback(
    ({ item, index }: { item: WeatherData; index: number }) => {
      return <WeatherCard {...item} />;
    },
    []
  );

  const separator = useCallback(() => {
    return <View style={styles.separatorView} />;
  }, []);

  const ListHeaderComponent = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.headerComponent}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }, [loading]);

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
      ListHeaderComponent={ListHeaderComponent}
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
  headerComponent: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
});
