import { WeatherContext } from "@context/WeatherContext";
import { useWeather } from "@hooks/useWeather"; // adjust the path
import { renderHook } from "@testing-library/react-native";

describe("useWeather hook", () => {
  it("returns context when inside WeatherProvider", () => {
    const wrapper = ({ children }) => (
      <WeatherContext.Provider value={{}}>{children}</WeatherContext.Provider>
    );

    const { result } = renderHook(() => useWeather(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it("check useWeather without Context", () => {
    expect(() => renderHook(() => useWeather())).toThrow(
      "useWeather must be used within a WeatherProvider"
    );
  });
});
