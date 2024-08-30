import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { SettingsLinks } from "@/constants/Values";
import RateUsModal from "@/components/RateUsModal";

export default function Settings() {
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (val: boolean) => {
    setShowModal(val);
  };
  const signOut = () => {};
  const handleClick = (id: number) => {
    switch (id) {
      case 1:
        openModal(true);
        return;
      case 2:
        router.push("/(root)/settings/about");
        return;
      case 3:
        router.push("/(root)/settings/buy-credits");
        return;
      case 4:
        signOut();
        return;
      default:
        return;
    }
  };

  return (
    <PrimaryBackground>
      <SafeAreaView>
        <View className="h-[300px] relative w-full overflow-hidden rounded-b-xl">
          <ImageBackground
            source={require("@/assets/images/settings/blue-banner.png")}
            className="h-full w-full justify-center items-center"
            resizeMode="cover"
          >
            <View className="flex-row h-20 items-center px-5 justify-between w-full absolute top-0 left-0">
              <TouchableOpacity onPress={() => router.back()} className="mr-3">
                <Feather name="arrow-left" size={25} color={Colors.text} />
              </TouchableOpacity>
              <Text className="flex-[0.7]" h3>
                Settings
              </Text>
            </View>
            <View className="rounded-full">
              <Image
                source={require("@/assets/images/settings/gear.png")}
                className="h-[80px] w-[80px] object-cover"
              />
            </View>
          </ImageBackground>
        </View>
        <View className="mt-5" />
        <FlatList
          data={SettingsLinks}
          renderItem={({ item: { Icon, text, id } }) => (
            <TouchableOpacity
              onPress={() => handleClick(id)}
              className="flex-row gap-x-3 my-4 px-4 items-center"
            >
              <View>
                <Icon size={42} color={Colors.text} />
              </View>
              <Text h3>{text}</Text>
            </TouchableOpacity>
          )}
        />
        <RateUsModal visible={showModal} openModal={openModal} />
      </SafeAreaView>
    </PrimaryBackground>
  );
}
