import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../Button";
type Props = {
  onPress: () => void;
  show?: boolean;
};
export default function DoneButton({ onPress, show=false }: Props) {
  return (
    <>
      {show ? (
        <View className="w-full">
          <LinearGradient
            colors={["#030916", "#041841"]}
            locations={[0.1, 1]}
            className=" bottom-0 opacity-70  absolute w-full  h-[100px]"
          ></LinearGradient>
          <Button
            containerClassName="my-4 h-[60px] z-[2] mx-5"
            onPress={onPress}
          >
            Done
          </Button>
        </View>
      ) : null}
    </>
  );
}
