import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { Image, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

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

export default function TabLayout() {
  const {
    auth: { user },
  } = useAuth();
  const profileIconSize = 30;

  return (
    <Tabs
      screenOptions={() => ({
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
        headerRight: () => (
          <Link href="/(root)/settings/" className="mr-3">
            <FontAwesome name="gear" size={25} color={Colors.text} />
          </Link>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transformation"
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "You",
          headerTitle: "",
          tabBarIcon: ({ color, focused,  }) => {
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
          }
        }}
      />
    </Tabs>
  );
}