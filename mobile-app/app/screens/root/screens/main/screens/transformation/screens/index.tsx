import { View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { transformationLinks } from "@/constants/Values";
import GradientHeading from "@/components/GradientHeading";
import PrimaryBackground from "@/components/PrimaryBackground";

import Colors from "@/constants/Colors";
import { Text } from "@/components/ui/Text";
import InsufficientCreditsSheet from "@/components/InsufficientCoinsSheet";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function  TransformationHomeScreen() {
  const router = useNavigation();
  const [showSheet, setShowSheet] = React.useState(false);
  const {auth: {user}} = useAuth()
  const creditBalance = user?.creditBalance || 0
  const handleRedirect = (type: TransformationTypeKey) => {
    if (creditBalance < 1) {
      setShowSheet(true);
      return;
    }
   router.navigate("Root", {
    screen: "MainTabs",
    params: {
      screen: "Transformation",
      params: { 
       screen: "NewTransformation",
        params: {
          type
        }
       },
    }
   })
  };
  const handleClose = () => {
    setShowSheet(false);
  };
  return (
    <PrimaryBackground>
      <View className="flex-1 px-3 py-3 pb-5">
        <View className="mt-4" />
        <GradientHeading>Select Transformation Type</GradientHeading>
        <View className="mb-5" />
        <FlatList
          data={transformationLinks}
          numColumns={2}
          keyExtractor={(item) => item.type}
          renderItem={({ item: { icon: Icon, label, type } }) => (
            <TouchableOpacity
              onPress={() => handleRedirect(type)}
              className="h-[200px] w-[47%] m-2 px-2 justify-center items-center rounded-2xl"
              style={{ backgroundColor: Colors.secondary }}
            >
              <View>{<Icon />}</View>
              <Text
                className="text-center opacit-80 w-[80%] mx-auto mt-2"
                style={{ color: Colors.neutral }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <InsufficientCreditsSheet 
      showSheet={showSheet} 
      onClose={handleClose} 
      />
    </PrimaryBackground>
  );
}
