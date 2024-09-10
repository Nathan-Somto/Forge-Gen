import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { pricingValues } from "@/constants/Values";
import PricingCard from "@/components/PricingCard";
import Colors from "@/constants/Colors";

export default function BuyCredits() {
  const [isLoading, setIsLoading] = React.useState(false);
  const toggleLoader = () => setIsLoading((prevState) => !prevState);
  return (
    <PrimaryBackground>
      <>
        <ScrollView className="pt-6">
          {pricingValues.map((item) => (
            <PricingCard key={item.id} {...item} toggleLoader={toggleLoader} />
          ))}
          <View className="h-6" />
        </ScrollView>
        {isLoading && (
          <View
            className="flex-1 absolute z-[50] top-0 w-full justify-center"
            style={{ backgroundColor: Colors.background }}
          >
            <View className="flex-row items-center">
            <ActivityIndicator  color={Colors.primary} />
            <Text className="ml-1.5" >
              Processing Payment...
            </Text>
            </View>
          </View>
        )}
      </>
    </PrimaryBackground>
  );
}
