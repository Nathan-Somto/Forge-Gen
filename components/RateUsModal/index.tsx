import { View, Modal, Image } from "react-native";
import React from "react";
import { Text } from "../ui/Text";
import Colors from "@/constants/Colors";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";

export default function RateUsModal({
  visible,
  openModal,
}: {
  visible: boolean;
  openModal: (val: boolean) => void;
}) {
  return (
    <Dialog visible={visible} onOpenChange={openModal}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="h-[520px] relative w-[90%] px-6 py-5 rounded-2xl bg-white">
          <Dialog.cancel onOpenChange={openModal} />
          <Image
            className="h-[200px] w-full object-center"
            source={require("@/assets/images/rate-us/star-illustration.png")}
            resizeMode="contain"
          />
          <Text h1 style={{ color: Colors.btnPrimary }} className="text-center">
            Rate Us
          </Text>
          <Text style={{ color: "#000" }} className="text-center">
            Support us by giving us 5 Stars
          </Text>
          <View>
            <Image
              source={require("@/assets/images/rate-us/stars.png")}
              className="w-full h-[100px] object-center"
            />
          </View>
          <View>
            <Button
              onPress={() => openModal(false)}
              containerClassName="mb-3 h-[50px]"
            >
              RATE NOW
            </Button>
            <Button
              variant="outline"
              containerClassName="h-[50px]"
              containerStyles={{borderColor: "#bbb"}}
              textStyles={{color: '#bbb'}}
            >
              maybe later
            </Button>
          </View>
        </View>
      </View>
    </Dialog>
  );
}
