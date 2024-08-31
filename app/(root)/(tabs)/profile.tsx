import { TouchableOpacity, View, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { Text } from "@/components/ui/Text";
import PrimaryBackground from "@/components/PrimaryBackground";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { profileCards } from "@/constants/Values";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const {
    auth: { user },
  } = useAuth();
  const { url, Options, handlePress, base64 } = useImagePicker({
    optionTitle: "Profile Photo",
  });
  const transformations = 8;
  const credits = user?.creditBalance || 0;

  const [selectedTab, setSelectedTab] = useState<string>("Transformations");

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <PrimaryBackground>
      <View className="flex-1">
        <View
          className="h-[360px] w-full px-4 border-b"
          style={{ borderBottomColor: Colors.neutral }}
        >
          <View className="flex-row mt-5 h-[110px] items-center">
            <TouchableOpacity
              className="mr-4 relative h-[100px] w-[100px]"
              onPress={handlePress}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.5 }}
                colors={Colors.multiColorGradient}
                className="h-full w-full items-center justify-center rounded-full"
              >
                <View
                  className="w-[95%] h-[95%] rounded-full relative items-center justify-center"
                  style={{ backgroundColor: Colors.primary }}
                >
                  {(url || user?.avatarUrl)? (
                    <Image
                      source={{ uri: user?.avatarUrl ?? url ?? '' }}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Feather name="user" size={75} color={Colors.neutral} />
                  )}
                  <TouchableOpacity
                    onPress={handlePress}
                    className="w-[40px] h-[40px] -bottom-2 -right-2 absolute rounded-full p-2 justify-center items-center"
                    style={{ backgroundColor: Colors.primary }}
                  >
                    <Entypo
                      name="camera"
                      size={20}
                      color="white"
                      onPress={handlePress}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View className="ml-2">
              <View>
                <Text h2>{user?.username}</Text>
                <Text className="mt-0.5" style={{ color: Colors.neutral }}>
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full mt-5 mb-3 flex-row gap-x-3">
            {profileCards(credits, transformations).map((item, index) => (
              <View
                key={item.id}
                className="h-[120px] my-3 justify-center w-[48%] rounded-lg p-4"
                style={{ backgroundColor: Colors.secondary }}
              >
                <Text
                  h3
                  className="mb-2"
                  style={{ color: Colors.neutral, fontSize: 16 }}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center">
                  <Image
                    source={item.image}
                    className="object-center w-[40px] h-[30px] object-cover mr-4"
                  />
                  <Text h3 style={{ color: Colors.btnPrimary }}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <FlatList
            data={["Transformations", "Liked", "Downloaded"]}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTabPress(item)}
                className="px-5 py-2"
                style={{
                  borderBottomWidth: selectedTab === item ? 2 : 0,
                  borderBottomColor:
                    selectedTab === item ? Colors.btnPrimary : "transparent",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      selectedTab === item ? Colors.btnPrimary : Colors.neutral,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Options />
      </View>
    </PrimaryBackground>
  );
}
