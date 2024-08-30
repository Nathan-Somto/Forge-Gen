import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeImg from "@/assets/images/welcome-img.png";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constants/Colors";
import { Button } from "@/components/ui/Button";
import GradientButton from "@/components/GradientButton";
import GradientHeading from "@/components/GradientHeading";
export default function welcome() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden />
      <LinearGradient
        colors={colors.backgroundGradient}
        locations={[0, 0.5]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-between px-3 pt-[40px] pb-[30px]">
          <View>
            <View className="w-full mx-auto mb-2">
              <GradientHeading align="center">Welcome</GradientHeading>
            </View>
            <View className="w-full mx-auto">
              <GradientHeading align="center">To Forge Gen</GradientHeading>
            </View>
          </View>
          <View className="relative ">
            <ImageBackground
              source={WelcomeImg}
              className="object-[center_left] object-cover mx-auto max-w-[400px] w-full  h-[300px] justify-center items-center"
            >
            <Image
              source={require("@/assets/images/white-logo.png")}
              className="h-[100px] w-[100px]"
            />
            </ImageBackground>
          </View>
          <View className="flex-row  h-[100px] items-center justify-around px-2 w-full">
            <View className="w-[45%]">
              <Button
                variant="outline"
                onPress={() => router.push("/(auth)/sign-in")}
                containerClassName="h-[65px] w-full mr-3 border-2 w-full rounded-[16px]"
              >
                Login
              </Button>
            </View>
            <View className="w-[50%]">
              <GradientButton
                onPress={() => router.push("/(auth)/sign-up")}
                containerClassName="w-full px-0"
              >
                Signup
              </GradientButton>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
