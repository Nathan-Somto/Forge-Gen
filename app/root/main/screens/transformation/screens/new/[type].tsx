import { ScrollView, View } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import TransformationForm from "@/components/TransformationForm";
import { StackScreenProps } from "@react-navigation/stack";
import { TransformationStackParamList } from "../../stack";
export default function NewTransformationScreen({route}: StackScreenProps<TransformationStackParamList, 'NewTransformation'>) {
  const { type } = route.params;
  return (
    <PrimaryBackground>
      <ScrollView className="px-5 flex-1">
        <TransformationForm
          type={type}
        />
      </ScrollView>
    </PrimaryBackground>
  );
}
