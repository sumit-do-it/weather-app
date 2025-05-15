import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Components/Keyboard/Keyboard", () => ({
  __esModule: true,
  default: {
    dismiss: jest.fn(),
    isVisible: jest.fn(() => false),
    addListener: jest.fn((eventType, callback) => ({
      remove: jest.fn(),
    })),
    removeAllListeners: jest.fn(),
  },
}));
