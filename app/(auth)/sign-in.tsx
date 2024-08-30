import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import GradientButton from "@/components/GradientButton";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientHeading from "@/components/GradientHeading";
import Colors from "@/constants/Colors";
import { GoogleButton } from "@/components/GoogleButton";
import { Text } from "@/components/ui/Text";
export default function SignIn() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (label: string, text: string) => {
    setData((prev) => ({ ...prev, [label.toLowerCase()]: text }));
  };
  const handleSubmit = () => {
    console.log(data);
    router.push("/(root)/(tabs)/");
  };
  return (
    <PrimaryBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1  px-5">
          <View className="my-2" />
          <GradientHeading>Welcome Back</GradientHeading>
          <View className="my-5" />
          <KeyboardAvoidingView>
            <FormField
              label="Email"
              handleChangeText={handleChange}
              placeholder="name@gmail.com"
              value={data.email}
              keyboardType="email-address"
            />
            <View className="my-1.5" />
            <FormField
              label="Password"
              handleChangeText={handleChange}
              placeholder="enter your password"
              isPassword
              value={data.password}
            />
            <View className="w-full">
              <View>
                <Link
                  href="/(auth)/sign-in"
                  style={{ color: Colors.neutral }}
                  className="text-lg mt-3 mb-5 font-medium"
                >
                  Forgot Password?
                </Link>
              </View>
              <GradientButton
                onPress={handleSubmit}
                containerStyles={{ width: 1000 }}
              >
                Login
              </GradientButton>
              <View className="flex-row items-center mt-3 mb-4">
                <View
                  className="h-[1px] w-[45%] mr-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
                <Text style={{ color: Colors.neutral }} className="text-center">
                  OR
                </Text>
                <View
                  className="h-[1px] w-[45%]  ml-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
              </View>
              <View className="my-1.5" />
              <GoogleButton />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </PrimaryBackground>
  );
}
