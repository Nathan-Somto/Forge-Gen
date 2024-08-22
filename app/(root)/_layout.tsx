import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function _layout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{headerShown: false}}/>
      <Stack.Screen name="image/[id]" options={{headerShown: false}}/>
    </Stack>
  );
}
