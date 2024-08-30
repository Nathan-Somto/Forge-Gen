import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
import { Feather } from "@expo/vector-icons";

export default function _layout() {
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
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Feather name="arrow-left" size={25} color={Colors.text} />
        </TouchableOpacity>
      ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{
        headerTitle: "About Us"
      }}
      />
      <Stack.Screen name="buy-credits" options={{
        headerTitle: "Buy Credits"
      }}
      />
    </Stack>
  );
}
