import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
import HomeScreen from "./screens";
import AboutScreen from "./screens/about";
import BuyCreditsScreen from "./screens/buy-credits";
import PaymentSuccessScreen from "./screens/payment-success";
import { useNavigation } from "@react-navigation/native";
import PaymentHistoryScreen from "./screens/payment-history";
export type SettingsStackParamList = {
  Home: undefined;
  About: undefined;
  BuyCredits: undefined;
  PaymentSuccess: { tx_ref: string; amount: number; plan: Omit<Plans, "Free"> };
  PaymentHistory: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  const router = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="PaymentSuccess"
      screenOptions={{
        headerTitleStyle: {
          color: Colors.text,
          fontSize: 22,
          fontFamily: Typo.medium,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() =>
              router.navigate("Root", {
                screen: "Settings",
                params: {
                  screen: "Home",
                },
              })
            }
            style={{ marginRight: 12 }}
          >
            <Feather name="arrow-left" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerTitle: "About Us" }}
      />
      <Stack.Screen
        name="BuyCredits"
        component={BuyCreditsScreen}
        options={{ headerTitle: "Buy Credits" }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{ headerShown: false }}
        initialParams={{ amount: 19.99, plan: "Pro", tx_ref: "3efa242" }}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{ headerTitle: "Payment History" }}
      />
    </Stack.Navigator>
  );
}
