import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { SettingsLinks } from "@/constants/Values";
import RateUsModal from "@/components/RateUsModal";
import { useAuth } from "@/hooks/useAuth";
import { logout as deleteSession } from "@/lib/appwrite";
import { useAssets } from "expo-asset";

export default function Settings() {
  const [assets, error] = useAssets(require("@/assets/images/settings/blue-banner.png"));
  const [disabled, setDisabled] = React.useState(false);
  const { logout } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (val: boolean) => {
    setShowModal(val);
  };
  const signOut = async () => {
    setDisabled(true);
    try {
      await deleteSession();
      logout();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      Alert.alert("Error Occured", (err as Error).message);
    } finally {
      setDisabled(false);
    }
  };
  const handleClick = async (id: number) => {
    switch (id) {
      case 1:
        openModal(true);
        return;
      case 2:
        router.push("/(root)/settings/about");
        return;
      case 3:
        router.push("/(root)/settings/payment-history");
        return;
      case 4:
        router.push("/(root)/settings/buy-credits");
        return;
      case 5:
        await signOut();
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
            source={{uri: assets ? assets[0]?.uri : ""}}
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
          renderItem={({ item: { Icon, text, id, color } }) => (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => handleClick(id)}
              className={`flex-row gap-x-3 my-4 px-4 items-center ${
                disabled ? "opacity-50" : ""
              }`}
            >
              <View>
                <Icon size={42} color={Colors.text} />
              </View>
              <Text h3 style={{ color: color ?? Colors.text }}>
                {text}
              </Text>
            </TouchableOpacity>
          )}
        />
        <RateUsModal visible={showModal} openModal={openModal} />
      </SafeAreaView>
    </PrimaryBackground>
  );
}
