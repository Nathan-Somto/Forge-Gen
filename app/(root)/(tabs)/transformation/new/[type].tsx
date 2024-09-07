import { ScrollView, View } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import TransformationForm from "@/components/TransformationForm";
import { useLocalSearchParams } from "expo-router";
export default function NewTransformation() {
  const { type } = useLocalSearchParams<{ type: string }>();
  return (
    <PrimaryBackground>
      <ScrollView className="px-5 flex-1">
        <TransformationForm
          type={type as TransformationTypeKey}
        />
      </ScrollView>
    </PrimaryBackground>
  );
}
