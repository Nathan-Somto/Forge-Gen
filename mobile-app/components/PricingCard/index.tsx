import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import GradientHeading from "../GradientHeading";
import { Text } from "../ui/Text";
import { Feather } from "@expo/vector-icons";
import { Button } from "../ui/Button";
import { FlutterwaveBtn } from "../FlutterwaveBtn";
type props = PricingValues & {
  toggleLoader: () => void;
  disableBtn: boolean;
  handleDisable: () => void;
};
export default function PricingCard({
  plan,
  price,
  credits,
  perks,
  toggleLoader,
  disableBtn,
  handleDisable,
}: props) {
  return (
    <View className="w-[80%] h-[360px] mb-6 mx-auto rounded-xl overflow-hidden">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        colors={Colors.multiColorGradient}
        className="h-full w-full items-center justify-center overflow-hidden"
      >
        <View
          style={{ backgroundColor: Colors.primary }}
          className="w-[99%] mx-auto h-[99%] py-6  rounded-xl overflow-hidden px-3"
        >
          <GradientHeading align="center">{plan}</GradientHeading>
          <Text h1 className="text-center my-2">
            ${price}
          </Text>
          <Text
            sm
            className="text-center mb-2"
            style={{ color: Colors.neutral }}
          >
            {credits} Credits
          </Text>
          {perks.map((item, index) => (
            <View
              key={item.text + index}
              className="flex-row items-center gap-x-2 my-2 w-[90%] mx-auto justify-center"
            >
              {item.isIncluded ? (
                <Feather name="check" color={"#009D7D"} size={20} />
              ) : (
                <Feather name="x" color={"#DC52D1"} size={20} />
              )}
              <Text className="flex-[0.9]">{item.text}</Text>
            </View>
          ))}
          <View className="mb-3" />
          <View className="">
            {price === 0 ? (
              <Button variant="outline" containerStyles={{ height: 65 }}>
                Free Consumable
              </Button>
            ) : (
              <FlutterwaveBtn
                disabled={disableBtn}
                plan={plan}
                onPress={handleDisable}
                price={price}
                toggleLoader={toggleLoader}
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({ container: {} });
