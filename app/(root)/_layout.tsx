import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: Colors.text,
          fontSize: 22,
          fontFamily: Typo.medium
         },
         headerTitleAlign : 'center',
        headerStyle: {
          backgroundColor: Colors.primary,
         },
        headerRight: () => (
          <Link href="/(root)/settings" className="mr-3">
            <FontAwesome name="gear" size={25} color={Colors.text} />
          </Link>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Feather name="arrow-left" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }}  />
    </Stack>
  );
}
