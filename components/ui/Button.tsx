import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Text } from "./Text";
type Variant = "primary" | "secondary" | "outline" | "transparent" | "white";
type Props = {
  variant?: Variant;
  containerClassName?: string;
  textClassName?: string;
  textStyles?:  StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};
function getContainerVariant(variant: Variant): StyleProp<ViewStyle> {
  switch (variant) {
    case "primary":
      return { backgroundColor: Colors.btnPrimary };
    case "secondary":
      return { backgroundColor: Colors.btnSecondary };
    case "outline":
      return {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Colors.btnPrimary,
      };
    case "white":
        return { backgroundColor: Colors.text };
    default:
        return {
            backgroundColor: "transparent"
        }
  }
}
export function Button({
  children,
  onPress,
  variant = "primary",
  textClassName,
  containerClassName,
  containerStyles,
  textStyles,
  disabled
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={`px-8 h-[40px] rounded-[12px] justify-center ${containerClassName} `}
      style={[getContainerVariant(variant), containerStyles]}
    >
      <Text
        className={`text-center ${textClassName}`}
        style={[{ color: variant === 'white' ? '#000' : Colors.text, }, textStyles]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
