import { Text as RnText, StyleProp, TextStyle, View } from "react-native";
import React from "react";
import Typo from "@/constants/Typo";
import { TextProps } from "react-native-svg";
import Colors from "@/constants/Colors";
type props = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  p?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  sm?: boolean;
  className?: string;
};
export function Text({
  children,
  className,
  style,
  p = false,
  h1 = false,
  h2 = false,
  h3 = false,
  sm = false,
}: props) {
  function getStyle() {
    if (p) {
      return Typo.sizes.p;
    }
    if (h1) {
      return Typo.sizes.h1;
    }
    if (h2) {
      return Typo.sizes.h2;
    }
    if (h3) {
      return Typo.sizes.h3;
    }
    if (sm) {
      return Typo.sizes.sm;
    }
    return Typo.sizes.p;
  }
  return (
    <RnText
      style={[getStyle(), { color: Colors.text }, style]}
      className={className}
    >
      {children}
    </RnText>
  );
}
