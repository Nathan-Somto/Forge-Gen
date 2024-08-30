import { View, Text, ScrollView } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { pricingValues } from "@/constants/Values";
import PricingCard from "@/components/PricingCard";

export default function BuyCredits() {
  return (
    <PrimaryBackground>
      <ScrollView className="pt-6">
        {pricingValues.map((item) => (
          <PricingCard key={item.id} {...item} />
        ))}
        <View className="h-6" />
      </ScrollView>
    </PrimaryBackground>
  );
}
