import { View } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Image } from "react-native";
import GradientHeading from "@/components/GradientHeading";
import { Text } from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import GradientButton from "@/components/GradientButton";

export default function About() {
  const [version, setVersion] = React.useState("");
  React.useEffect(() => {
    const value = require("@/package.json");
    setVersion(value?.version);
  }, []);
  return (
    <PrimaryBackground>
      <View className="justify-center items-center flex-1 w-full">
        <View
          className="h-[180px] w-[180px] mb-8  mx-auto  p-2 rounded-full justify-center items-center"
          style={{ backgroundColor: Colors.secondary }}
        >
          <Image
            source={require("@/assets/images/about/info.png")}
            className="h-[100px] w-[100px]"
          />
        </View>
        <View className="h-[45px] w-full">
          <GradientHeading align="center">Forge Gen</GradientHeading>
        </View>
        <View>
          <Text className="text-[20px] my-4 text-center">
            Version {version}
          </Text>
        </View>
        <View
          className="w-[70%] mx-auto h-[2px]"
          style={{ backgroundColor: Colors.neutral }}
        />
        <View className="w-[90%] mx-auto mt-8">
          <Text style={{ color: Colors.neutral }} className="text-center">
            Forge Gen is a next Gen Ai-Powered Image Editor that enables
            seamless transformations with the click of a button.
          </Text>
        </View>
        <GradientButton containerClassName="w-[70%] mx-auto mt-5">
          Rate Us
        </GradientButton>
      </View>
    </PrimaryBackground>
  );
}
