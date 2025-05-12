# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction)

## Architectural Decisions

This weather app is built using the following key architectural decisions:

1. **Expo Framework**: We chose Expo for its robust development environment, easy setup, and cross-platform capabilities. It provides a streamlined development experience with features like hot reloading and built-in APIs.

2. **File-based Routing**: The app uses Expo Router's file-based routing system, which provides a more intuitive and maintainable way to handle navigation compared to traditional navigation libraries.

3. **Component Structure**: The app follows a modular component architecture where:

   - Components are organized by feature/functionality
   - Reusable UI components are separated from feature-specific components
   - Each component follows the single responsibility principle

4. **State Management**: The app uses React's built-in state management (useState, useContext) for simpler state handling, making it easier to maintain and debug.

5. **API Integration**: For this small-scale application, we directly integrate the weather API calls within the components where needed. This approach is simpler and more straightforward for the current scope of the application. If the application grows in complexity, we can consider implementing a dedicated service layer.

These architectural choices were made to ensure:

- Maintainable and scalable codebase
- Easy onboarding for new developers
- Efficient development workflow
- Good performance and user experience
