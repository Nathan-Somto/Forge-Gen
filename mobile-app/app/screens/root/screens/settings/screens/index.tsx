import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { SettingsLinks } from "@/constants/Values";
import RateUsModal from "@/components/RateUsModal";
import { useAuth } from "@/hooks/useAuth";
import { logout as deleteSession } from "@/lib/appwrite";
import { useAssets } from "expo-asset";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
export default function Settings() {
  const router = useNavigation();
  const [assets, error] = useAssets(
    require("@/assets/images/settings/bluebanner.png")
  );
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
    } catch (err) {
      Alert.alert("Error Occured", (err as Error).message);
    } finally {
      setDisabled(false);
    }
  };
  const handleClick = async (id: (typeof SettingsLinks)[number]["text"]) => {
    switch (id) {
      case "Rate Us":
        openModal(true);
        return;
      case "Buy Credits":
        router.navigate("Root", {
          screen: "Settings",
          params: {
            screen: "BuyCredits",
          },
        });
        return;
      case "About Us":
        router.navigate("Root", {
          screen: "Settings",
          params: {
            screen: "About",
          },
        });
        return;
      case "Payment History":
        router.navigate("Root", {
          screen: "Settings",
          params: {
            screen: "PaymentHistory",
          },
        });
        return;
      case "Log out":
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
            source={{ uri: assets ? assets[0]?.uri : "" }}
            className="h-full w-full justify-center items-center"
            resizeMode="cover"
          >
            <View className="flex-row h-20 items-center px-5  w-full absolute top-0 left-0">
              <TouchableOpacity
                onPress={() => router.goBack()}
                className="mr-3"
              >
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
              disabled={disabled}
              onPress={() => handleClick(text)}
              className={`flex-row gap-x-3 my-4 px-4 items-center ${
                disabled ? "opacity-50" : ""
              }
              ${text === "Log out" ? "text-[#eb344c]" : ""}
                `}
            >
              <View>
                <Icon size={42} color={Colors.text} />
              </View>
              <Text
                h3
                style={{ color: text === "Log out" ? "#eb344c" : Colors.text }}
              >
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
