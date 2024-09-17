import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import {
  View,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import GradientButton from "@/components/GradientButton";
import GradientHeading from "@/components/GradientHeading";
import { useAssets } from "expo-asset";
import { useNavigation } from "@react-navigation/native";
export default function Welcome() {
const router = useNavigation();
  const [assets] = useAssets([
    require("@/assets/images/whitelogo.png"),
    require("@/assets/images/welcomeimg.png"),
  ]);
  console.log("assets", assets);

 
    return (
      <SafeAreaView className="flex-1">
        <StatusBar hidden />
        <PrimaryBackground>
            <View  className="flex-1 justify-between px-3 pt-[40px] pb-[30px]">
              <View>
                <View className="w-full mx-auto mb-2">
                  <GradientHeading align="center">Welcome</GradientHeading>
                </View>
                <View className="w-full mx-auto">
                  <GradientHeading align="center">To Forge Gen</GradientHeading>
                </View>
              </View>
              <View className="relative ">
                {assets && (
                  <ImageBackground
                    source={{ uri: assets[1].uri }}
                    className="object-[center_left] object-cover mx-auto max-w-[400px] w-full  h-[300px] justify-center items-center"
                  >
                    <Image
                      source={{ uri: assets[0].uri }}
                      className="h-[100px] w-[100px]"
                    />
                  </ImageBackground>
                )}
              </View>
              <View className="flex-row  h-[100px] items-center justify-around px-2 w-full">
                <View className="w-[45%]">
                  <Button
                    variant="outline"
                    onPress={() => router.navigate("Auth", { screen: "SignIn" })}
                    containerClassName="h-[65px] w-full mr-3 border-2 w-full rounded-[16px]"
                  >
                    Login
                  </Button>
                </View>
                <View className="w-[50%]">
                  <GradientButton
                    onPress={() => router.navigate("Auth", { screen: "SignUp" })}
                    containerClassName="w-full px-0"
                  >
                    Signup
                  </GradientButton>
                </View>
              </View>
            </View>
        </PrimaryBackground>
      </SafeAreaView>
    );
  }
