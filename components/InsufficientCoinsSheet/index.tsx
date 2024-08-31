import { View, Image } from "react-native";
import React from "react";
import Sheet from "../ui/Sheet";
import { Text } from "../ui/Text";
import GradientButton from "../GradientButton";
import { router } from "expo-router";
import { Button } from "../ui/Button";
import StackedCoins from "@/assets/images/stacked-coins.png";
import Colors from "@/constants/Colors";
type Props = {
  showSheet: boolean;
  onClose: () => void;
};
export default function InsufficientCreditsSheet({
  showSheet,
  onClose,
}: Props) {
  return (
    <Sheet
      onClose={onClose}
      title="Insufficient Credits"
      height={0.8}
      open={showSheet}
    >
      <View className="h-full  w-full justify-evenly">
        <Image
          source={StackedCoins}
          className="h-[200px] object-center w-full object-cover "
        />
        <View>
        <Text h2 className="text-center mb-3" style={{ color: "#000" }}>
          {" "}
          Oops.... Looks like you've run out of free credits!
        </Text>
        <Text className="mb-3 text-center" style={{ color: "rgba(0,0,0,0.8)" }}>
          {" "}
          You can purchase more credits to continue using the app.
        </Text>
        <View className="mt-3">
          <Button
            variant="outline"
            containerClassName="w-full mb-4 h-[65px]"
            textStyles={{ color: Colors.btnPrimary }}
            onPress={onClose}
          >
            Cancel
          </Button>
          <GradientButton
            containerClassName="mx-auto w-full"
            onPress={() => {
              onClose();
              router.push("/(root)/settings/buy-credits");

            }}
          >
            Purchase Credits
          </GradientButton>
        </View>
        </View>
      </View>
    </Sheet>
  );
}
