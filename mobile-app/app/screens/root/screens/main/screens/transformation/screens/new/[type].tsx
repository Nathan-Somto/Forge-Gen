import { Image, ScrollView, View, ActivityIndicator } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import TransformationForm from "@/components/TransformationForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransformationStackParamList } from "../../stack";
import { Text } from "@/components/ui/Text";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

export default function NewTransformationScreen({
  route,
}: NativeStackScreenProps<TransformationStackParamList, "NewTransformation">) {
  const { type } = route.params;
  const [isGenerating, setIsGenerating] = React.useState(false);
  const toggleGenerating = (val: boolean) => setIsGenerating(val);

  return (
    <PrimaryBackground>
      <ScrollView className="px-5 flex-1">
        <TransformationForm type={type} setIsGenerating={toggleGenerating} />
      </ScrollView>
      {isGenerating && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white z-50">
          <LinearGradient
            colors={Colors.purpleGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 justify-center items-center w-full"
          >
            <Image
              source={require("@/assets/images/generating.gif")}
              className="flex-[0.5]"
              resizeMode="contain"
            />

            <View className="flex-row gap-x-2 items-center mt-[45px]">
              <ActivityIndicator
                size="large"
                color="white"
              />
              <Text h1 className="text-white text-center">
                Transforming...
              </Text>
            </View>
          </LinearGradient>
        </View>
      )}
    </PrimaryBackground>
  );
}
