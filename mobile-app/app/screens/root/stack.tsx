import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
import { useAuth } from "@/hooks/useAuth";
import MainTabs, { MainTabsParamList } from "./screens/main/tabs";
import SettingsStack, { SettingsStackParamList } from "./screens/settings/stack";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const {
    auth: { user, checking },
  } = useAuth();
  if (!user && !checking) return null;
  const router = useNavigation();
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
