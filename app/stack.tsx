import PrimaryBackground from "@/components/PrimaryBackground";
import Colors from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import AuthStack, { AuthStackParamList } from "./auth/stack";
import RootStack, { RootStackParamList } from "./root/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
export type AppStackParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};
const Stack = createStackNavigator<AppStackParamList>();
export default function AppStack() {
  const {
    auth: { user, checking },
  } = useAuth();
  if (checking) {
    return (
      <PrimaryBackground>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={Colors.text} size={"large"} />
        </View>
      </PrimaryBackground>
    );
  }
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Root" component={RootStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
