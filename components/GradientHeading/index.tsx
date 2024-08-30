import { Text, View } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
type props = {
  size?: number;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
};
export default function GradientHeading({
  children,
  size = 30,
  align = "left",
}: props) {
  const style = {
    fontSize: size,
    textAlign: align,
    color: Colors.text,
    flex: 1,
  };
  return (
    <MaskedView
      style={{ height: size * 1.2 }}
      maskElement={
        <View className="flex-row flex-1 justify-center items-center">
          <Text style={[Typo.sizes.h1, style]} className="font-medium">
            {children}
          </Text>
        </View>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1, height: "100%" }}
        colors={Colors.multiColorGradient}
      />
    </MaskedView>
  );
}
