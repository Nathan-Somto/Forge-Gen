import Button from "@/components/Button";
import PrimaryBackground from "@/components/PrimaryBackground";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import { dummyData } from "@/components/GeneratedImage/dummyData";
import GeneratedImage, {
  GeneratedImageProps,
} from "@/components/GeneratedImage";
import Row from "@/components/Row";
import React from "react";
import { convertToRowValue } from "@/utils";

export default function HomeScreen() {
  const [generations, setGenerations] = React.useState<GeneratedImageProps[][]>(
    []
  );
  React.useEffect(() => {
    setGenerations(convertToRowValue(dummyData));
  }, []);
  return (
    <PrimaryBackground>
      <View className="px-5">
        <Link href="/(tabs)/generate" asChild>
          <TouchableOpacity className="w-full mx-auto items-center">
            <LinearGradient
              colors={Colors.multiColorGradient}
              className="h-[150px] w-full mt-5 justify-center items-center  flex-row rounded-[16px]  px-6"
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <FontAwesome name="magic" size={25} color={Colors.text} />
              <Text
                className="text-xl font-semibold ml-2.5"
                style={{ color: Colors.text }}
              >
                Generate Image
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-12 px-5">
        {generations.length === 0 ? (
          <View className="h-[70%] justify-center items-center opacity-50">
            <Feather
              name="camera-off"
              size={100}
              color={Colors.neutral}
              className="opacity-50"
            />
            <Text
              className="text-lg mt-3 text-center"
              style={{ color: Colors.neutral }}
            >
              No Images Generated
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={{ color: Colors.text }}
              className="text-lg mb-4 font-medium text-left uppercase leading-[30px]"
            >
              My Generations
            </Text>
            <FlatList
              data={generations}
              renderItem={({ item, index }) => (
                <Row
                  key={index}
                  data={item}
                  keyExtractor={(item) => item.id}
                  Component={GeneratedImage}
                />
              )}
              scrollEnabled
              showsVerticalScrollIndicator
            />
          </>
        )}
      </View>
    </PrimaryBackground>
  );
}
