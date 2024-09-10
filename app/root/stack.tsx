import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
import { useAuth } from "@/hooks/useAuth";
import MainTabs, { MainTabsParamList } from "./main/tabs";
import SettingsStack, { SettingsStackParamList } from "./settings/stack";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const {
    auth: { user, checking },
  } = useAuth();
  if (!user && !checking) return null;
  const router = useNavigation();
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
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              router.navigate("Root", {
                screen: "Settings",
                params: {
                  screen: "Home",
                },
              })
            }
          >
            <FontAwesome name="gear" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.goBack()}>
            <Feather name="arrow-left" size={25} color={Colors.text} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerTitle: "Settings" }}
      />
    </Stack.Navigator>
  );
}
