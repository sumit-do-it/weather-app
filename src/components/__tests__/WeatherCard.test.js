import ClearIcon from "@weather-icons/clear.jpg";
import { render } from "test-utils";
import { WeatherCard } from "../WeatherCard";

describe("Weather Card Test Cases", () => {
  test("should render content correctly", () => {
    const { getByTestId } = render(
      <WeatherCard
        city="Delhi"
        temperature={35}
        condition={"Clear"}
        icon={null}
        bg={ClearIcon}
      />
    );

    expect(getByTestId("background-image").props.source).toBe(ClearIcon);
    expect(getByTestId("city-text")).toHaveTextContent("Delhi");
    expect(getByTestId("temp-text")).toHaveTextContent("35°C");
    expect(getByTestId("condition-text")).toHaveTextContent("Clear");
  });
});
