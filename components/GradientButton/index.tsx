import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Button } from "../ui/Button";
type Props = Omit<Parameters<typeof Button>[number], "variant">;
export default function GradientButton({ children, ...props }: Props) {
  return (
    <View className={`h-[65px] ${props.containerClassName}`}>
      <LinearGradient
        colors={Colors.purpleGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        className="h-full rounded-[16px] justify-center items-center w-full"
      >
        <Button
          {...props}
          containerClassName="h-full w-full"
          variant="transparent"
        >
          {children}
        </Button>
      </LinearGradient>
    </View>
  );
}
