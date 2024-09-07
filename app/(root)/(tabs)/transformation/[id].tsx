import { View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import ImageComparison from "@/components/ImageComparison";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientButton from "@/components/GradientButton";
import { Button } from "@/components/ui/Button";
import { useTransformation } from "@/hooks/useTransformation";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { getTotalDownloads } from "@/utils";
export default function Transformation() {
  const { current } = useTransformation();
  React.useEffect(() => {
    if (current === null) {
      router.back();
    }
  }, [current]);
  const listData = current ? Object.entries(current.transData) : [];
  listData.unshift(["transformation", current?.transformationType ?? ""]);
  const handleDownload = (url: string) => {};
  return (
    <PrimaryBackground>
      <View className="flex-row flex-wrap px-3 my-5">
        {listData.map(([key, value], index) => (
          <View key={key} className="flex-row items-center">
            {index !== 0 && (
              <View
                className="w-[10px] rounded-full h-[10px] mx-2"
                style={{ backgroundColor: Colors.neutral }}
              />
            )}
            <Text sm style={{ color: Colors.labelText }}>
              {key}:{" "}
            </Text>
            <Text sm style={{ color: Colors.btnPrimary }}>
              {value}
            </Text>
          </View>
        ))}
      </View>
      <View className="flex-row items-center px-3 my-6">
        <Text h3>Original</Text>
        <View className="relative w-[40%] max-w-[120px] mx-auto h-[30px] justify-center">
          <View className="h-[30px] w-[2px] absolute left-[50%] bg-white z-[2] top-0 " />
          <View className="w-full h-[3px] bg-white" />
        </View>
        <Text h3>Transformed</Text>
      </View>
      <ImageComparison
        leftImage={current?.ogImgUrl ?? ""}
        rightImage={current?.transImgUrl ?? ""}
      />
      <Button
        onPress={() => handleDownload(current?.ogImgUrl ?? "")}
        variant="outline"
        containerClassName="h-[65px] w-[90%] mx-auto mt-5 mb-2"
      >
        Download Original
      </Button>
      <GradientButton
        onPress={() => handleDownload(current?.transImgUrl ?? "")}
        containerClassName="w-[90%] mx-auto mt-4"
      >
        Download Transformed
      </GradientButton>
      <View className="mt-3 px-3">
        <Text h3 style={{ color: Colors.labelText }}>
          Downloads:{" "}
        </Text>
        <Text>{current?.downloads}</Text>
      </View>
    </PrimaryBackground>
  );
}
