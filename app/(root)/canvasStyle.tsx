import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { canvasSizes } from "@/constants/Values";
import { convertToRowValue } from "@/utils";
import Row from "@/components/Row";
import Colors from "@/constants/Colors";
import HeaderText from "@/components/HeaderText";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import DoneButton from "@/components/DoneButton";
import { router, useLocalSearchParams } from "expo-router";

export default function CanvasStyle() {
  const { canvasStyleValue } = useLocalSearchParams<{
    canvasStyleValue?: string;
  }>();
  const [canvasValues, setCanvasValues] = React.useState<
    null | (typeof canvasSizes)[]
  >(null);
  const [selectedValue, setSelectedValue] = React.useState("auto");
  const [showDoneButton, setShowDoneButton] = React.useState(false);
  React.useEffect(() => {
    setSelectedValue((prev) => canvasStyleValue ?? prev);
  }, [canvasStyleValue]);
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setShowDoneButton(value !== selectedValue && value !== canvasStyleValue);
  };
  const handleRedirect = () => {
    router.push({
      pathname: "/(root)/(tabs)/generate",
      params: {
        canvasStyleValue: selectedValue,
      },
    });
    setShowDoneButton(false);
  };
  React.useEffect(() => {
    setCanvasValues(convertToRowValue(canvasSizes));
  }, []);

  return (
    <PrimaryBackground>
      <HeaderText>Choose a Canvas Size</HeaderText>
      {canvasValues !== null && (
        <FlatList
          data={canvasValues}
          className="pb-8"
          renderItem={({ item, index }) => (
            <Row key={index}>
              {item.map((canvasValue) => {
                const isSelected = selectedValue === canvasValue.value;
                return (
                  <TouchableOpacity
                    key={canvasValue.value}
                    className="w-[42%] relative mx-auto my-4 h-[160px] rounded-md  justify-center items-center"
                    style={{
                      backgroundColor: Colors.secondary,
                    }}
                    onPress={() => handleSelect(canvasValue.value)}
                  >
                    <LinearGradient
                      colors={
                        isSelected
                          ? Colors.multiColorGradient
                          : Array(2).fill(Colors.secondary)
                      }
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 0.8, y: 1 }}
                      className="h-full w-full rounded-md"
                    >
                      <View
                        style={{
                          backgroundColor: Colors.secondary,
                        }}
                        className="relative z-[2] m-[1%] w-[98%] h-[98%] px-3 py-4 justify-center items-center rounded-md"
                      >
                        {canvasValue.image !== null && (
                          <Image source={canvasValue.image} className="mb-2" />
                        )}
                        <Text
                          style={{ color: Colors.text }}
                          className={`
                          font-medium
                          leading-[26px]
                          capitalize
                          ${
                            canvasValue.image === null ? "text-4xl" : "text-2xl"
                          }
                        `}
                        >
                          {canvasValue.value}
                        </Text>
                        {isSelected && (
                          <View className="h-[26px] absolute bottom-2 right-3 w-[26px] rounded-full bg-white justify-center items-center p-1">
                            <FontAwesome
                              name="check"
                              color={"#222"}
                              size={16}
                            />
                          </View>
                        )}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </Row>
          )}
        />
      )}
      <DoneButton show={showDoneButton} onPress={handleRedirect} />
    </PrimaryBackground>
  );
}
