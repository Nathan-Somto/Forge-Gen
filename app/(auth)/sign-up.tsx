import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import Colors from "@/constants/Colors";
import GradientButton from "@/components/GradientButton";
import { Text } from "@/components/ui/Text";
import { GoogleButton } from "@/components/GoogleButton";
export default function SignUp() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    username: "",
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
      <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1  px-5">
          <View className="my-2" />
          <GradientHeading>Let's Get Started!</GradientHeading>
          <View className="my-5" />
          <KeyboardAvoidingView>
            <FormField
              label="Username"
              handleChangeText={handleChange}
              placeholder="@"
              value={data.username}
            />
              <View className="my-1.5" />
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
            <View>
              <View>
                <View className="mt-3 mb-8 flex-row">
                  <Text style={{ color: Colors.neutral }}> Have an Account Already </Text>
                  <Link
                    href="/(auth)/sign-in"
                    style={{ color: Colors.neutral }}
                  >
                    <Text style={{ color: Colors.labelText }}>Login?</Text>
                  </Link>
                </View>
              </View>
              <GradientButton onPress={handleSubmit}>Signup</GradientButton>
              <View className="flex-row items-center mt-3 mb-4">
                <View
                  className="h-[1px] w-[45%] mr-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
                <Text
                  style={{ color: Colors.neutral }}
                  className="text-center"
                >
                  OR
                </Text>
                <View
                  className="h-[1px] w-[45%]  ml-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
              </View>
              <View className="my-1.5" />
              <GoogleButton/>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <View className="h-[40px]"/>
      </ScrollView>
    </PrimaryBackground>
  );
}
