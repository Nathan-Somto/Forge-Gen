import { ScrollView } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import TransformationForm from "@/components/TransformationForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransformationStackParamList } from "../../stack";
export default function NewTransformationScreen({route}: NativeStackScreenProps<TransformationStackParamList, 'NewTransformation'>) {
  const { type } = route.params;
  return (
    <PrimaryBackground>
        <TransformationForm
          type={type}
        />
      <ScrollView className="px-5 flex-1">
      </ScrollView>
    </PrimaryBackground>
  );
}
