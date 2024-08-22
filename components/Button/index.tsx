import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
type Variant = "primary" | "secondary" | "outline" | "transparent" | "white";
type Props = {
  variant?: Variant;
  containerClassName?: string;
  textClassName?: string;
  onPress?: () => void;
  children: React.ReactNode;
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
export default function Button({
  children,
  onPress,
  variant = "primary",
  textClassName,
  containerClassName,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-8  h-[40px] rounded-[12px] justify-center ${containerClassName} `}
      style={getContainerVariant(variant)}
    >
      <Text
        className={`font-medium text-lg text-center ${textClassName}`}
        style={{ color: variant === 'white' ? '#000' : Colors.text }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
