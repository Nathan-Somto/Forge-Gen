import { View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import ImageComparison from "@/components/ImageComparison";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientButton from "@/components/GradientButton";
import { Button } from "@/components/ui/Button";
export default function Transformation() {
  return (
    <PrimaryBackground> 

      <View className="flex-row items-center px-3 my-6">
        <Text h3>Original</Text>
        <View className="relative w-[40%] max-w-[120px] mx-auto h-[30px] justify-center">
          <View className="h-[30px] w-[2px] absolute left-[50%] bg-white z-[2] top-0 "/>
          <View className="w-full h-[3px] bg-white"/>
        </View>
        <Text h3>Transformed</Text>
      </View>
      <ImageComparison
        leftImage={require("@/assets/images/dummy/image1.png")}
        rightImage={require("@/assets/images/dummy/image2.png")}
      />
      <Button variant="outline" containerClassName="h-[65px] w-[90%] mx-auto mt-5 mb-2">Download Original</Button>
      <GradientButton containerClassName="w-[90%] mx-auto mt-4">Download Transformed</GradientButton>
    </PrimaryBackground>
  );
}
