import React, { useState, useRef } from "react";
import { View, PanResponder, Image, LayoutChangeEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { returnUri } from "@/utils";

export default function ImageComparison({
  leftImage,
  rightImage,
}: {
  leftImage: string | number;
  rightImage: string | number;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [dividerPosition, setDividerPosition] = useState(0);
  const containerRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      let newDividerPosition = gestureState.moveX;
      if (newDividerPosition < 0) newDividerPosition = 0;
      if (newDividerPosition > containerWidth - 10)
        newDividerPosition = containerWidth;
      setDividerPosition(newDividerPosition);
    },
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
    setDividerPosition(width / 2);
  };



  return (
    <View className="w-[80%] h-[300px] mx-auto rounded-xl overflow-hidden">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={Colors.multiColorGradient}
        className="h-full w-full items-center justify-center overflow-hidden"
      >
        <View
          onLayout={onLayout}
          ref={containerRef}
          className="w-[98%] mx-auto h-[98%] flex-row items-center rounded-xl  bg-gray-200 overflow-hidden"
        >
          <View
            style={{ width: dividerPosition }}
            className="h-full bg-transparent"
          >
            <Image
              source={returnUri(leftImage)}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <View
            {...panResponder.panHandlers}
            style={{ left: dividerPosition - 10 }}
            className="absolute h-full w-[20px] z-[2] bg-transparent justify-center items-center"
          >
            <View className="w-[3.5px] h-full bg-white" />
            <View
              style={{ backgroundColor: Colors.purpleGradient[0] }}
              className="absolute w-[30px] h-[30px] rounded-full  justify-center items-center"
            >
              <MaterialIcons name="drag-indicator" size={20} color="white" />
            </View>
          </View>

          <View
            style={{ width: containerWidth - dividerPosition }}
            className="h-full bg-transparent"
          >
            <Image
              source={returnUri(rightImage)}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
