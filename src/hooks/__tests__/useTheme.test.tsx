import { ThemeContext } from "@context/ThemeContext";
import { useTheme } from "@hooks/useTheme"; // adjust the path
import { renderHook } from "@testing-library/react-native";

describe("useTheme hook", () => {
  it("returns context when inside ThemeProvider", () => {
    const wrapper = ({ children }) => (
      <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBeDefined();
  });

  it("check useTheme without Context", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
  });
});
