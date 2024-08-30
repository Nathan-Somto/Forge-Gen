import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Feather name="arrow-left" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.backgroundGradient[0],
        },
        headerTitleStyle: {
          color: Colors.text,
          fontSize: 22,
        },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in"  />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
