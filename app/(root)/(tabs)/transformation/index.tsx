import { View,  FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { transformationLinks } from "@/constants/Values";
import GradientHeading from "@/components/GradientHeading";
import PrimaryBackground from "@/components/PrimaryBackground";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { Text } from "@/components/ui/Text";

export default function transformation() {
  return (
    <PrimaryBackground>
      <View className="flex-1 px-3 py-3 pb-5">
      <View className="mt-4" />
        <GradientHeading>Select Transformation Type</GradientHeading>
        <View className="mb-5" />
        <FlatList
          data={transformationLinks}
          numColumns={2}
          keyExtractor={(item) => item.type}
          renderItem={({ item: {icon: Icon, label, type} }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(`/(root)/transformation/new/${type}`)
              }
              className="h-[200px] w-[47%] m-2 px-2 justify-center items-center rounded-2xl"
              style={{ backgroundColor: Colors.secondary }}
            >
              <View>{<Icon/>}</View>
              <Text
                className="text-center opacit-80 w-[80%] mx-auto mt-2"
                style={{ color: Colors.neutral}}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </PrimaryBackground>
  );
}