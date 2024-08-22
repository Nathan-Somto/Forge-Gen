import Button from "@/components/Button";
import PrimaryBackground from "@/components/PrimaryBackground";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { dummyData } from "@/components/GeneratedImage/dummyData";
import GeneratedImage from "@/components/GeneratedImage";

export default function HomeScreen() {
  return (
    <PrimaryBackground>
      <View className="px-5  overflow-scroll">
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
        <View className="mt-12">
          {dummyData.length === 0 ? (
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
                data={dummyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <GeneratedImage
                    {...item}
                  />
                )}
                scrollEnabled
                showsVerticalScrollIndicator
                numColumns={2}
              />
              <View className="h-[100px]"/>
            </>
          )}
        </View>
      </View>
    </PrimaryBackground>
  );
}
