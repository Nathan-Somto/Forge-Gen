import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export function convertToRowValue<T>(value: T[], columns = 2): T[][] {
  const final = [];
  for (let i = 0; i < value.length; i += columns) {
    final.push(value.slice(i, i + columns));
  }
  return final;
}

export const returnUri = (imageSrc: string | number) => {
  return typeof imageSrc === "string" ? { uri: imageSrc } : imageSrc;
};

export const downloadImage =  async (
  url: string,
  title = "Image"
) => {
  try{
    let fileExtension = url.split(".").pop();
    fileExtension = fileExtension !== 'png' && fileExtension !== 'jpg' ? 'png' : fileExtension;
    const filePath = FileSystem.documentDirectory + title + new Date().getTime() + "." + fileExtension;
    const res = await FileSystem.downloadAsync(url, filePath, {
      cache: false,
    });
    return res.uri;
  }
  catch(err){
    console.log("Error downloading image: ", err);
    Alert.alert("Error", "Failed to download image");
  }
};
