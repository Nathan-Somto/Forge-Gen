import { ScrollView, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import ImageComparison from "@/components/ImageComparison";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientButton from "@/components/GradientButton";
import { Button } from "@/components/ui/Button";
import { useTransformation } from "@/hooks/useTransformation";
import Colors from "@/constants/Colors";
import { useDownloadImage } from "@/hooks/useDownloadImage";
import { useAuth } from "@/hooks/useAuth";
import InsufficientCreditsSheet from "@/components/InsufficientCoinsSheet";
export default function TransformationScreen() {
  const [showSheet, setShowSheet] = React.useState(false);
  const { current } = useTransformation();
  const { user } = useAuth((state) => state.auth);

  React.useEffect(() => {
    if (current === null) {
      
    }
  }, [current]);
  const downloadsLeft = user?.downloadsLeft || 0;
  const { handleImgDownload, isPending } = useDownloadImage();
  const listData = current ? Object.entries(current.transData) : [];
  listData.unshift(["transformation", current?.transformationType ?? ""]);
  const handleDownload = async (url: string) => {
    if (isPending) return;
    if (!current?.title || !current?.$id) return;
    try {
      if (downloadsLeft === 0) {
        setShowSheet(true);
        return;
      }
      await handleImgDownload({
        title: current?.title ?? "",
        url,
        transId: current?.$id ?? "",
      });
    } catch (e) {}
  };
  return (
    <PrimaryBackground>
      <ScrollView>
      <View className="flex-row flex-wrap px-3 my-5">
        {listData.map(([key, value], index) => (
          <View key={key} className="flex-row  items-center">
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
      <View className="mt-5 px-3 flex-row pb-5">
        <Text h3 style={{ color: Colors.labelText }}>
          Downloads:{" "}
        </Text>
        <Text style={{ color: Colors.btnPrimary }}>{current?.downloads}</Text>
      </View>
      </ScrollView>
      <InsufficientCreditsSheet
        showSheet={showSheet}
        onClose={() => setShowSheet(false)}
      />
    </PrimaryBackground>
  );
}
