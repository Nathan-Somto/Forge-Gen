import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
import HomeScreen from "./screens"; 
import AboutScreen from "./screens/about";
import BuyCreditsScreen from "./screens/buy-credits";
import PaymentSuccessScreen from "./screens/payment-success";
import { useNavigation } from '@react-navigation/native';
import PaymentHistoryScreen from "./screens/payment-history";
export type SettingsStackParamList = {
  Home: undefined;
  About: undefined;
  BuyCredits: undefined;
  PaymentSuccess: { tx_ref: string, amount: number, plan: Omit<Plans, 'Free'>  };
  PaymentHistory: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

export default function AppStack() {
  const navigation = useNavigation();

  return (
      <Stack.Navigator
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
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
        />
        <Stack.Screen 
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{ headerTitle: "Payment History" }}
        />
      </Stack.Navigator>
  );
}
