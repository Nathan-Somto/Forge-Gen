import { View, Text, Image } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { dummyData } from "@/components/GeneratedImage/dummyData";

export default function ImageDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = React.useState<(typeof dummyData)[number] | null>(
    null
  );
  React.useEffect(() => {
    const foundData = dummyData.find((item) => item.id === id);
    if (foundData === undefined) {
      router.back();
    } else {
      setData(foundData);
    }
  }, [id]);
  return (
    <PrimaryBackground>
      <View className="flex-1  justify-between">
        <View className="flex-[0.9]">
          {data?.imageUrl && (
            <Image
              source={
                typeof data?.imageUrl === "string"
                  ? { uri: data.imageUrl }
                  : data.imageUrl
              }
              className="h-[60%] rounded-br-3xl rounded-bl-3xl w-full mb-6"
            />
          )}
          <View>
            <Text
              style={{ color: Colors.labelText }}
              className="font-medium text-[22px] mb-3 px-5"
            >
              Prompt
            </Text>
            <View
              style={{ backgroundColor: Colors.secondary }}
              className="h-[89px] rounded-[26px] w-[95%] mx-auto px-5 justify-center mb-5"
            >
              <Text
                style={{ color: Colors.text }}
                className="text-[20px] font-medium"
              >
                {data?.prompt}
              </Text>
            </View>
          </View>
          <View className="px-5">
            <Text
              style={{ color: Colors.labelText }}
              className="font-medium text-lg mb-2"
            >
              Image Style
            </Text>
            <Text
              className="capitalize text-[28px] font-medium mb-10"
              style={{ color: Colors.text }}
            >
              {data?.imageStyle}
            </Text>
          </View>
        </View>

        <Button
          onPress={() =>
            router.push({
              pathname: "/(root)/(tabs)/generate",
              params: {
                prompt: data?.prompt,
                imageStyle: data?.imageStyle,
              },
            })
          }
          containerClassName="h-[55px] mb-10 w-[80%] mx-auto"
        >
          Try Prompt
        </Button>
      </View>
    </PrimaryBackground>
  );
}
