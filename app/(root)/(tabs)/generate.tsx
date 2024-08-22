import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import Button from "@/components/Button";
import { Link, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { randomImagePrompts } from "@/constants/Values";

export default function Generate() {
 const {prompt, imageStyle} = useLocalSearchParams<{prompt?: string, imageStyle?: string}>();
  const [promptValue, setPromptValue] = React.useState("");
  const [canvasValue, setCanvasValue] = React.useState('1:1');
  const [imageStyleValue, setImageStyleValue] = React.useState('cartoon');
  React.useEffect(() => {
    setPromptValue(prompt ?? '');
    setImageStyleValue(imageStyle ?? 'cartoon')
  }, [prompt, imageStyle])
  function getRandomPrompt() {
    const prompt =
      randomImagePrompts[Math.floor(Math.random() * randomImagePrompts.length)];
    setPromptValue(prompt);
  }
  return (
    <PrimaryBackground>
      <View className="flex-1 justify-between">
        <View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView className="">
              <View className="h-[350px] mt-4 mb-10">
                <LinearGradient
                  colors={Colors.multiColorGradient}
                  className="h-[320px] w-[90%] relative mt-5 justify-center items-center  flex-row rounded-[16px] mx-auto"
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0.8, y: 1 }}
                >
                  <View
                    className="h-[318px] w-[99%] mx-auto my-0.5 rounded-[16px] px-5 py-3"
                    style={{ backgroundColor: Colors.primary }}
                  >
                    <View className="flex-row justify-between">
                      <Text
                        style={{ color: Colors.text }}
                        className="text-lg font-semibold"
                      >
                        Enter Prompt
                      </Text>
                      <TouchableOpacity
                        onPress={getRandomPrompt}
                        className="h-[30px] w-[30px] rounded-full bg-white justify-center items-center p-1"
                      >
                        <FontAwesome name="random" color={"#222"} size={18} />
                      </TouchableOpacity>
                    </View>
                    <View className="mt-3 relative h-[200px] w-full">
                      <TextInput
                        value={promptValue}
                        onChangeText={setPromptValue}
                        placeholder="Provide a detailed description of your image"
                        placeholderTextColor={Colors.neutral}
                        className="w-full h-full rounded-lg text-lg leading-6  px-2  text-left"
                        style={{
                          backgroundColor: Colors.secondary,
                          color: Colors.text,
                        }}
                        maxLength={300}
                        multiline
                      />
                       <TouchableOpacity
                        onPress={() => setPromptValue('')}
                        className="absolute bottom-3 right-3 z-[3] rounded-full"
                      >
                        <FontAwesome name="close" color={"#fff"}  size={24} />
                      </TouchableOpacity>
                    </View>
                    <View className="mt-5">
                        <Text style={{color: Colors.labelText}} className="text-center font-medium">{promptValue.length} / 300</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View className="flex-row w-[90%] mx-auto">
                <Link href="/(root)/imageStyle" asChild>
                  <Button
                    variant="secondary"
                    containerClassName="h-[50px] w-[50%] mr-4 px-2 text-base rounded-xl"
                  >
                    Choose Style
                  </Button>
                </Link>
                <Link href="/(root)/canvasStyle" asChild>
                  <Button
                    variant="secondary"
                    containerClassName="h-[50px] w-[50%] px-2 rounded-xl text-base"
                  >
                    Choose Canvas
                  </Button>
                </Link>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
        <Button
          containerClassName="h-[65] mb-10 w-[90%] mx-auto"
          textClassName="font-semibold text-2xl"
        >
          Generate
        </Button>
      </View>
    </PrimaryBackground>
  );
}
