import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import PrimaryBackground from "@/components/PrimaryBackground";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
export default function Profile() {
  const { url, Options, handlePress, base64 } = useImagePicker({
    optionTitle: "Profile Photo",
  });
  return (
    <PrimaryBackground>
      <Text h1>Profile</Text>
      <View className="flex-row">
        <TouchableOpacity className="mr-4 relative h-[100px] w-[100px]">
          
          {url ? (
            <Image source={{ uri: url }} />
          ) : (
            <Entypo name="user" size={100} color="black" />
          )}
          <View
            className="w-[40px] h-[40px] rounded-full p-2 justify-center items-center"
            style={{ backgroundColor: Colors.primary }}
          >
            <Entypo
              name="camera"
              size={20}
              color="white"
              onPress={handlePress}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text h2>John Doe</Text>
          <Text>johndoe@gmail.com</Text>
        </View>
      </View>
    </PrimaryBackground>
  );
}
