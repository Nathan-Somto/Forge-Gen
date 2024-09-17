import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import Colors from "@/constants/Colors";

export default function HeaderText({ children }: PropsWithChildren) {
  return (
    <Text
      style={{ color: Colors.text }}
      className="font-semibold text-2xl my-5 text-center"
    >
      {children}
    </Text>
  );
}
