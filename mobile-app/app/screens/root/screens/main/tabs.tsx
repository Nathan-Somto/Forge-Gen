import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import HomeScreen from "./screens";
import TransformationStack, {
  TransformationStackParamList,
} from "./screens/transformation/stack";
import ProfileScreen from "./screens/profile";
import { Button } from "@/components/ui/Button";
export type MainTabsParamList = {
  Home: undefined;
  Transformation: NavigatorScreenParams<TransformationStackParamList>;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<MainTabsParamList>();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size || 25}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function MainTabs() {
  const router = useNavigation();
  const {
    auth: { user },
  } = useAuth();
  const profileIconSize = 30;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors.tabBackground,
          borderWidth: 0,
          borderTopWidth: 0,
          height: 55,
        },
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: Colors.text,
          fontSize: 22,
        },
        headerTitleAlign: "center",
        headerRight: () =>
          route.name === "Home" && (
            <TouchableOpacity
              onPress={() =>
                router.navigate("Root", {
                  screen: "Settings",
                  params: {
                    screen: "Home",
                  },
                })
              }
              className="mr-3 "
            >
              <FontAwesome name="gear" size={25} color={Colors.text} />
            </TouchableOpacity>
          ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Transformation"
        component={TransformationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="plus-circle" color={color} size={45} />
          ),
          tabBarIconStyle: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          },
          title: "",
          headerTitle: "New Transformation",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "You",
          headerTitle: "",
          tabBarIcon: ({ color, focused }) => {
            if (user?.avatarUrl) {
              return (
                <View
                  style={{
                    borderColor: focused
                      ? Colors.tabIconSelected
                      : "transparent",
                    borderWidth: 3,
                    borderRadius: 30,
                    padding: 2,
                  }}
                >
                  <Image
                    source={{ uri: user.avatarUrl }}
                    style={{
                      width: profileIconSize,
                      height: profileIconSize,
                      borderRadius: profileIconSize / 2,
                    }}
                  />
                </View>
              );
            } else {
              return <TabBarIcon name="user-circle" color={color} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
