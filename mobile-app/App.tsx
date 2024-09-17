import "react-native-url-polyfill/auto";
import "react-native-reanimated";
import { Fonts } from "@/constants/Typo";
import { AuthProvider } from "@/context/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";
import AppStack from "./app/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button } from "./components/ui/Button";
import PrimaryBackground from "./components/PrimaryBackground";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [Fonts.Semibold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    [Fonts.Regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
    [Fonts.Medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function loadFonts() {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <PrimaryBackground>
      <Text h1>Something went wrong</Text>
      <Text>{error.message}</Text>
      <Button onPress={resetErrorBoundary} containerStyles={{ height: 50 }}>
        Try again
      </Button>
    </PrimaryBackground>
  );
}
function RootLayoutNav() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppStack />
        </NavigationContainer>
      </AuthProvider>
    </ErrorBoundary>
  );
}
