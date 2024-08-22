import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Button from "../Button";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
type props = {
  imageUrl: string | number;
  prompt: string;
  isOwner: boolean;
  userIds: string[];
  id: string;
  ownerId: string;
  imageStyle: string;
};
export default function GeneratedImage({id, imageUrl, prompt, isOwner, imageStyle }: props) {
  const [favourite, setFavourite] = React.useState(false);
  return ( 
    <View className="flex-[0.5] h-[200px] my-2.5 mx-1.5 ">
      <View className="relative w-full ">
        <TouchableOpacity onPress={() => router.push(`/(root)/image/${id}`)}>
        <Image
          source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
          className="h-[130px] rounded-md w-full"
        />
        </TouchableOpacity>
        <View className="absolute bottom-2 px-3 flex-row justify-between w-full">
          <TouchableOpacity onPress={() => setFavourite((prev) => !prev)}>
            {!favourite ? (
              <FontAwesome name="heart-o" size={24} color={"#fff"} />
            ) : (
              <FontAwesome name="heart" size={24} color={"red"} />
            )}
          </TouchableOpacity>
          {isOwner ? (
            <TouchableOpacity>
              <Feather name="download" size={24} color={"#fff"} />
            </TouchableOpacity>
          ) : (
            <Button
              variant="white"
              containerClassName="h-6 px-5 bg-white"
              textClassName="uppercase text-sm"
              onPress={() =>
                router.push({
                  pathname: "/(root)/(tabs)/generate",
                  params: {
                    prompt,
                    imageStyle,
                  },
                })
              }
            >
              Try
            </Button>
          )}
        </View>
      </View>
      <View className="mt-3 w-[80%] mx-auto">
        <Text
          className="text-sm font-medium w-full text-center"
          ellipsizeMode="tail"
          style={{ color: Colors.text }}
        >
          {prompt}
        </Text>
      </View>
    </View>
  );
}
