import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Modal, TouchableOpacity, View, PanResponder } from "react-native";
import { Text } from "@/components/ui/Text";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export function useImagePicker({ optionTitle }: { optionTitle: string }) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState<string | null>(null);
  const [displayOptions, setDisplayOptions] = React.useState<boolean>(false);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      setUrl(result.assets[0].uri);
      setBase64(result.assets[0]?.base64 ?? null);
    }
    setDisplayOptions(false);
  };

  const handlePhotoTake = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });
    if (!result.canceled) {
      setUrl(result.assets[0].uri);
      setBase64(result.assets[0]?.base64 ?? null);
    }
    setDisplayOptions(false);
  };

  const handlePress = () => {
    setDisplayOptions(true);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setDisplayOptions(false);
        }
      },
    })
  ).current;

  const Options = () => {
    return (
      <Modal transparent visible={displayOptions} animationType="slide">
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"
            onPress={() => setDisplayOptions(false)}
          />
          <View
            {...panResponder.panHandlers}
            className="bg-white w-full h-[30%] rounded-t-[12px] px-6 py-4 items-center"
          >
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={() => setDisplayOptions(false)}
            >
              <Feather name="x" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <Text className="text-lg font-bold mb-4">{optionTitle}</Text>
            <View className="flex-row justify-between w-full px-4">
              <TouchableOpacity
                className="items-center"
                onPress={handleImagePick}
              >
                <Entypo name="images" size={30} color={Colors.primary} />
                <Text className="mt-2">Choose from gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center"
                onPress={handlePhotoTake}
              >
                <Feather name="camera" size={30} color={Colors.primary} />
                <Text className="mt-2">Take a photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return { url, Options, handlePress, base64 };
}
