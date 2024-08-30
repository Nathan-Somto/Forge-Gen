import React from "react";
import * as ImagePicker from "expo-image-picker";
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

  const Options = () => {
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
    return (
      <Modal transparent visible={displayOptions} animationType="fade">
        <TouchableOpacity
          className="flex-1  bg-black relative"
          onPress={() => setDisplayOptions(false)}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            position: "relative",
          }}
        >
          <View
            {...panResponder.panHandlers}
            style={{
              backgroundColor: Colors.text,
              bottom: 0,
              position: "absolute",
              zIndex: 5,
              width: "100%",
              height: "30%",
              paddingHorizontal: 12,
              borderTopEndRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              className="absolute top-2 right-2"
              style={{position: "absolute", top: 10, right: 10}}
              onPress={() => setDisplayOptions(false)}
            >
              <Feather name="x" size={20} color={Colors.secondary} />
            </TouchableOpacity>
            <Text h2 style={{ color: "#000", marginVertical: 16 }}>
              {optionTitle}
            </Text>
            <View
              style={{
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                height: "60%"
              }}
            >
              <TouchableOpacity
                style={{alignItems: "center"}}
                onPress={handleImagePick}
              >
                <Entypo name="images" size={35} color={Colors.btnPrimary} />
                <Text sm style={{ marginTop: 8, color: "rgba(0,0,0,0.7)", textAlign: "center" }}>
                  Choose from gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: "center"}}
                onPress={handlePhotoTake}
              >
                <Feather name="camera" size={35} color={Colors.btnPrimary} />
                <Text sm style={{ marginTop: 8, color: "rgba(0,0,0,0.7)", textAlign: "center" }}>
                  Take a photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return { url, Options, handlePress, base64 };
}