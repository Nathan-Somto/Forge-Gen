import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Text } from "./Text";
type Variant = "primary" | "secondary" | "outline" | "transparent" | "white";
type Props = {
  variant?: Variant;
  containerClassName?: string;
  textClassName?: string;
  textStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
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
        backgroundColor: "transparent",
      };
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
  disabled,
  loading,
}: Props) {
  const color = variant === "white" ? "#000" : Colors.text;
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      className={`px-8 h-[40px] rounded-[12px] justify-center ${containerClassName} ${
        (disabled || loading) && "opacity-50"
      } `}
      style={[getContainerVariant(variant), containerStyles]}
    >
      <Text
        className={`text-center ${textClassName}`}
        style={[{ color }, textStyles]}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={color} />
        ) : (
          children
        )}
      </Text>
    </TouchableOpacity>
  );
}
