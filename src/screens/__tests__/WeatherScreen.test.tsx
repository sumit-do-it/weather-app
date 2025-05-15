jest.mock("@hooks/useWeather");
import { useWeather } from "@hooks/useWeather";
import WeatherScreen from "@screens/WeatherScreen";
import { Keyboard } from "react-native";
import { act, fireEvent, render } from "test-utils";

const mockFetchWeather = jest.fn();

describe("Weather Screen Test Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  useWeather.mockImplementation(() => ({
    fetchWeather: mockFetchWeather,
    weatherData: null,
    loading: false,
    error: null,
  }));

  it("toggle theme button", () => {
    const { getByTestId } = render(<WeatherScreen />);
    const themeTextBefore = getByTestId("theme-text").props.children;

    act(() => {
      fireEvent.press(getByTestId("theme-toggle-button"));
    });

    const themeTextAfter = getByTestId("theme-text").props.children;
    expect(themeTextAfter).not.toBe(themeTextBefore);
  });

  it("check handleSearch with cityInput", () => {
    const { getByTestId } = render(<WeatherScreen />);

    act(() => {
      fireEvent.changeText(getByTestId("city-input"), "Tokyo");
    });

    expect(getByTestId("city-input").props.value).toBe("Tokyo");

    act(() => {
      fireEvent.press(getByTestId("search-button"));
    });
    expect(mockFetchWeather).toHaveBeenCalledWith("Tokyo");
  });

  it("check handleSearch without cityInput", () => {
    const { getByTestId } = render(<WeatherScreen />);

    act(() => {
      fireEvent.changeText(getByTestId("city-input"), "  ");
      fireEvent.press(getByTestId("search-button"));
    });

    expect(mockFetchWeather).not.toHaveBeenCalled();
  });

  it("checks keyboard dismiss is called on getting weather data", () => {
    useWeather.mockReturnValueOnce({
      fetchWeather: mockFetchWeather,
      weatherData: null,
      loading: false,
      error: null,
    });

    render(<WeatherScreen />);

    useWeather.mockReturnValueOnce({
      fetchWeather: mockFetchWeather,
      weatherData: { city: "Delhi", temperature: "25", condition: "Clear" },
      loading: false,
      error: null,
    });

    render(<WeatherScreen />);

    expect(Keyboard.dismiss).toHaveBeenCalled();
  });
});
