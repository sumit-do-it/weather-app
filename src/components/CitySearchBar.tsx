import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWeather } from "@hooks/useWeather";
import React, { memo, useCallback, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

const CitySearchBar = (props: { style?: ViewStyle }) => {
  const inputRef = useRef(null);
  const [cityInput, setCityInput] = useState("");
  const { fetchWeather } = useWeather();

  const handleSearch = useCallback(async () => {
    if (cityInput.trim()) {
      const found = await fetchWeather(cityInput.trim());
      if (found) {
        setCityInput("");
      }
    }
  }, [cityInput, fetchWeather]);

  return (
    <View style={[styles.searchContainer, props.style]}>
      <TextInput
        testID="city-input"
        ref={inputRef}
        style={[styles.input]}
        placeholder="Enter city name"
        placeholderTextColor={"white"}
        value={cityInput}
        onChangeText={setCityInput}
        onSubmitEditing={handleSearch}
      />
      <Pressable testID="search-button" hitSlop={8} onPress={handleSearch}>
        <MaterialCommunityIcons name={"send"} size={20} color={"white"} />
      </Pressable>
    </View>
  );
};

export default memo(CitySearchBar);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingRight: 8,
    borderWidth: 0.75,
    paddingVertical: 6,
    borderColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 8,
    color: "white",
  },
  button: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
