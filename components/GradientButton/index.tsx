import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import Button from "../Button";
type Props = Omit<Parameters<typeof Button>[number], 'variant'>;
export default function GradientButton({ children, ...props }: Props) {
  return (
    <LinearGradient
      colors={Colors.purpleGradient}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      className="h-[65px] rounded-[16px]   px-8 justify-center items-center"
    >
      <Button {...props} variant="transparent">{children}</Button>
    </LinearGradient>
  );
}
