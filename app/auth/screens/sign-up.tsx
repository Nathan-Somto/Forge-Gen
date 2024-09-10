import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import Colors from "@/constants/Colors";
import GradientButton from "@/components/GradientButton";
import { Text } from "@/components/ui/Text";
import { GoogleButton } from "@/components/GoogleButton";
import { useAuth } from "@/hooks/useAuth";
import { signUp } from "@/lib/appwrite";
import { useNavigation } from "@react-navigation/native";
export default function SignUp() {
  const router = useNavigation();
  const { login } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const handleChange = (label: string, text: string) => {
    setData((prev) => ({ ...prev, [label.toLowerCase()]: text }));
  };
  const disableBtn = !Object.values(data).every((item) => item.length > 0);
  console.log("disable btn: ",disableBtn)
  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const user = await signUp(data.username, data.email, data.password);
      login(user);
      router.navigate('Root', {
        screen: "MainTabs",
        params: {
          screen: "Home",
        },
      })
    } catch (err) {
      Alert.alert("Error Occured", (err as Error).message)
    } finally {
      setSubmitting(false)
    }
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
                    <Text style={{ color: Colors.neutral }}>
                      {" "}
                      Have an Account Already{" "}
                    </Text>
                    <TouchableWithoutFeedback
                     
                      onPress={() => router.navigate("Auth", { screen: "SignIn" })}
                    >
                      <Text style={{ color: Colors.labelText }}>Login?</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <GradientButton
                  onPress={handleSubmit}
                  loading={submitting}
                  disabled={disableBtn}
                >
                  Signup
                </GradientButton>
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
                <GoogleButton />
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        <View className="h-[40px]" />
      </ScrollView>
    </PrimaryBackground>
  );
}
