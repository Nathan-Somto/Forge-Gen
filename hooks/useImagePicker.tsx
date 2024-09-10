import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Modal, TouchableOpacity, View, PanResponder, Alert } from "react-native";
import { Text } from "@/components/ui/Text";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Sheet from "@/components/ui/Sheet";
import { AppwriteFile } from "@/lib/appwrite";

export function useImagePicker({ optionTitle, sizeLimit }: { optionTitle: string, sizeLimit?:number }) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState<string | null>(null);
  const [displayOptions, setDisplayOptions] = React.useState<boolean>(false);
  const [appwriteFile, setAppwriteFile] = React.useState<AppwriteFile | null>(null);
  const isTooLarge = (fileSize: number | undefined ) => {
    if(fileSize && sizeLimit && fileSize > sizeLimit){
      Alert.alert('File size is too large');
      return true;
    }
    return false;
  }
  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    });
    if (!result.canceled) {
      if (result.assets.length === 0) return;
      const asset = result.assets[0];
      if(isTooLarge(asset.fileSize)) return;
      const file: AppwriteFile = {
        name: asset.fileName ?? 'no name',
        size: asset.fileSize ?? 0,
        type: asset.type ?? 'image/jpeg',
        uri: asset.uri,
      }
      setAppwriteFile(file);
      setUrl(asset.uri);
      setBase64(asset.base64 ?? null);
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
      if (result.assets.length === 0) return;
      const asset = result.assets[0];
      if(isTooLarge(asset.fileSize)) return;
      setUrl(result.assets[0].uri);
      setBase64(result.assets[0]?.base64 ?? null);
    }
    setDisplayOptions(false);
  };

  const handlePress = () => {
    setDisplayOptions(true);
  };

  const Options = () => {
    const onClose = () => {
      setDisplayOptions(false);
    };
    return (
      <Sheet
        title={optionTitle}
        onClose={onClose}
        height={0.25}
        open={displayOptions}
        sheetContentStyles={{ justifyContent: "center", height: "60%" }}
      >
        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={handleImagePick}
          >
            <Entypo name="images" size={35} color={Colors.btnPrimary} />
            <Text
              sm
              style={{
                marginTop: 8,
                color: "rgba(0,0,0,0.7)",
                textAlign: "center",
              }}
            >
              Choose from gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={handlePhotoTake}
          >
            <Feather name="camera" size={35} color={Colors.btnPrimary} />
            <Text
              sm
              style={{
                marginTop: 8,
                color: "rgba(0,0,0,0.7)",
                textAlign: "center",
              }}
            >
              Take a photo
            </Text>
          </TouchableOpacity>
        </View>
      </Sheet>
    );
  };

  return { url, Options, handlePress, base64, appwriteFile };
}
