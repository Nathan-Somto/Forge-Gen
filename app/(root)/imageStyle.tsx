import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import PrimaryBackground from "@/components/PrimaryBackground";
import Button from "@/components/Button";
import { imageStyles } from "@/constants/Values";
import { router, useLocalSearchParams } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import HeaderText from "@/components/HeaderText";
import DoneButton from "@/components/DoneButton";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function ImageStyle() {
  const { imageStyleIndex } = useLocalSearchParams<{
    imageStyleIndex?: string;
  }>();
  const [selectedIndex, setSelectedIndex] = React.useState(
    imageStyles.length - 1
  );
  const [showDoneButton, setShowDoneButton] = React.useState(false);
  React.useEffect(() => {
    setSelectedIndex((prev) => +(imageStyleIndex ?? prev));
    
  }, [imageStyleIndex]);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setShowDoneButton(index !== selectedIndex && index !== +(imageStyleIndex ?? -1 ));
  };
  const handleRedirect = () =>  {
    router.push({
    pathname: "/(root)/(tabs)/generate",
    params: {
      imageStyleIndex: selectedIndex
    },
  });
  setShowDoneButton(false);
  }
  return (
    <PrimaryBackground>
      <HeaderText>
      Select An Image Style
      </HeaderText>
      <View className="flex-1 p-4">
        <View className="items-center mb-10">
          {imageStyles[selectedIndex].image === null ? (
            <View
              /* style={{ backgroundColor: Colors.purpleGradient[0] }} */
              style={{ backgroundColor: '#09275D' /* Colors.purpleGradient[0] */ }}
              className="h-64 w-64 p-2 rounded-md justify-center items-center"
            >
              <Entypo name="block" size={180} color={Colors.text} />
            </View>
          ) : (
            <Image
              source={imageStyles[selectedIndex].image}
              className="w-64 h-64"
              resizeMode="contain"
            />
          )}
          <View className="bg-black/60 rounded-3xl justify-center px-4 py-2 mt-5 h-12 w-[80%] ">
            <Text
              style={{ color: Colors.text }}
              className="text-center text-lg capitalize font-medium"
            >
              {imageStyles[selectedIndex].value}
            </Text>
          </View>
        </View>
        <FlatList
          data={imageStyles}
          keyExtractor={(item) => item.value}
          horizontal
          className="p-2"
          renderItem={({ item, index }) => (
            <View className="mr-4">
              <TouchableOpacity
                className={`mb-2 h-[110px] justify-center items-center p-2 `}
                onPress={() => handleSelect(index)}
              >
               <LinearGradient
                      colors={
                        selectedIndex === index
                          ? Colors.multiColorGradient
                          : Array(2).fill('rgba(0,0,0,0)')
                      }
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 0.8, y: 1 }}
                      className="h-[98px] w-[98px] p-[2px] justify-center items-center rounded-md"
                    >
                {item.image === null ? (
                  <View
                    style={{ backgroundColor: '#09275D' /* Colors.purpleGradient[0] */ }}
                    className="h-24 w-24 m-2 p-2 rounded-md justify-center items-center"
                  >
                    <Entypo name="block" size={70} color={Colors.text} />
                  </View>
                ) : (
                  <Image
                  source={item.image}
                  className="w-24 h-24 rounded-md"
                  resizeMode="cover"
                  />
                )}
                </LinearGradient>
                {selectedIndex === index && (
                 <View className="h-[24px] absolute top-3 right-3 w-[24px] rounded-full bg-white justify-center items-center p-1">
                 <FontAwesome
                   name="check"
                   color={"#222"}
                   size={14}
                 />
               </View>
                )}
              </TouchableOpacity>
              <Text
                style={{ color: Colors.text }}
                className="text-center text-[16.5px] capitalize"
              >
                {item.value}
              </Text>
            </View>
          )}
        />
      </View>
       <DoneButton onPress={handleRedirect} show={showDoneButton}/>
    </PrimaryBackground>
  );
}
