import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import SignInScreen from "./screens/sign-in";
import SignUpScreen from "./screens/sign-up";
import WelcomeScreen from "./screens/welcome";
export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => ""} className="mr-3">
            <Feather name="arrow-left" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
        headerTitle: "",
        headerStyle: {
          backgroundColor: Colors.backgroundGradient[0],
        },
        headerTitleStyle: {
          color: Colors.text,
          fontSize: 22,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen  name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
