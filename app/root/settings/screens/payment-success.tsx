import React, { useRef, useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { SettingsStackParamList } from "../stack";
import { useNavigation } from "@react-navigation/native";

export default function PaymentSuccessScreen({
  route,
}: StackScreenProps<SettingsStackParamList, "PaymentSuccess">) {
  const { tx_ref, amount, plan } = route.params;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotation = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const router = useNavigation();
  useEffect(() => {
    // check mark scale animation
    Animated.spring(checkmarkScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(() => {
      // rotate the checkmark 360 degrees
      Animated.timing(checkmarkRotation, {
        toValue: 1, // Rotate 360 degrees
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // Text fade in animation
        Animated.timing(detailsOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);

  // Rotation interpolation to rotate from 0 to 360 degrees
  const rotationInterpolate = checkmarkRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <PrimaryBackground>
      <View className="flex-1 justify-center items-center px-5 w-full">
        {/* Animated White checkmark with green circular background */}
        <Animated.View
          style={{
            transform: [
              { scale: checkmarkScale },
              { rotate: rotationInterpolate },
            ],
          }}
          className="bg-green-600 rounded-full w-24 h-24 justify-center items-center mb-5"
        >
          <Text className="text-white text-5xl font-bold">✓</Text>
        </Animated.View>

        <Animated.View style={{ opacity: detailsOpacity }}>
          <Text className="mb-5 text-center">
            Thank you for supporting Forge-Gen!
          </Text>
          <View className="items-center mb-7">
            <Text h2 className="mb-3 text-gray-800">
              Transaction Details
            </Text>
            <Text>tx_ref: {tx_ref}</Text>
            <Text>Amount: {amount}</Text>
            <Text>Plan: {plan}</Text>
          </View>
        </Animated.View>

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
              alignSelf: "center",
            },
            { opacity: detailsOpacity },
          ]}
        >
          Continue Transforming!
        </Button>
      </View>
    </PrimaryBackground>
  );
}
