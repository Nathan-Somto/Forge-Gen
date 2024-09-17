import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function PaymentSuccessScreen({
  route,
}: NativeStackScreenProps<SettingsStackParamList, "PaymentSuccess">) {
  const { tx_ref, amount, plan } = route.params;

  // Animation refs
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const router = useNavigation();

  useEffect(() => {
    Animated.spring(checkmarkScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(detailsOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <PrimaryBackground>
      <View className="flex-1 justify-center items-center px-5 w-full">
        {/* Checkmark Animation */}
        <Animated.View
          style={{
            transform: [{ scale: checkmarkScale }],
          }}
          className={`rounded-full bg-green-500 border-green-600 h-[115px] w-[115px] justify-center items-center`}
        >
          <Feather name="check" size={50} color="white" />
        </Animated.View>

        {/* Transaction Details */}
        <Animated.View style={{ opacity: detailsOpacity }}>
          <Text h1 className="mb-5 mt-3 text-center">
            Thank you for supporting Forge-Gen!
          </Text>
          <View
            className="w-full max-w-md mx-auto mb-7 p-4  rounded-lg shadow-md"
            style={{ backgroundColor: Colors.secondary }}
          >
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Feather name="tag" size={20} color={Colors.neutral} />
                <Text p className="ml-3 text-gray-600">
                  tx_ref: {tx_ref}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="dollar-sign" size={20} color={Colors.neutral} />
                <Text p className="ml-3 text-gray-600">
                  Amount: {amount}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="gift" size={20} color={Colors.neutral} />
                <Text p className="ml-3 text-gray-600">
                  Plan: {plan}
                </Text>
              </View>
            </View>
          </View>

          {/* Button to navigate back */}
          <Button
            onPress={() =>
              router.navigate("Root", {
                screen: "MainTabs",
                params: { screen: "Home" },
              })
            }
            containerStyles={[
              {
                width: "100%",
                maxWidth: 300,
                height: 65,
                alignSelf: "center",
                marginTop: 20,
              },
              { opacity: detailsOpacity },
            ]}
          >
            Continue Transforming!
          </Button>
        </Animated.View>
      </View>
    </PrimaryBackground>
  );
}
