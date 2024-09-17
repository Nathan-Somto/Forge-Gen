import {
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Text } from "@/components/ui/Text";
import FormField from "../FormField";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "../ui/Dropdown";
import { aspectRatios, transformationFormInfo } from "@/constants/Values";
import GradientHeading from "../GradientHeading";
import GradientButton from "../GradientButton";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Cloudinary, TransformationResponse } from "@/lib/appwrite";
import { createUserTransformation, updateCredits } from "@/lib/appwrite";
import { useAuth } from "@/hooks/useAuth";
import { useTransformation } from "@/hooks/useTransformation";
import { LinearGradient } from "expo-linear-gradient";
import { useCache } from "@/hooks/useCache";
import { useNavigation } from "@react-navigation/native";
type TransformOptions = {
  public_id: string;
  height: number;
  width: number;
};

export default function TransformationForm({
  type,
}: TransformationFormProps) {
  const router = useNavigation();
  const {auth: {user}} = useAuth();
  const {setCache, getCache} = useCache();
  const userId = user?.$id ?? '';
  const { updateUserInfo } = useAuth();
  const { setCurrent } = useTransformation();
  const { base64, handlePress, url, Options } = useImagePicker({
    optionTitle: "Upload Photo",
    sizeLimit: 2 * 1024 * 1024 //2mb in bytes
  });
  const [formInfo] = useState(transformationFormInfo[type]);
  const [data, setData] = useState<TransformationData>({
    title: "",
    prompt: "",
    color: "",
    aspectRatio: "1:1",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    const keyes: Record<string, string> = {
      "Image Title": "title",
      "Object to Recolor": "prompt",
      "Object to Remove": "prompt",
      "Replacement Color": "color",
    };
    setData({
      ...data,
      [keyes[key]]: value,
    });
  };

  const handleDropdownChange = (item: DropdownData<AspectRatios>[number]) => {
    setData((prev) => ({
      ...prev,
      aspectRatio: item.value,
    }));
  };



  const handleTransform = async (
    type: TransformationTypeKey,
    { public_id, height, width }: TransformOptions
  ) => {
    let response: TransformationResponse | null = null;
    switch (type) {
      case "removeBackground":
        response = await Cloudinary.bgRemove(public_id, { height, width });
        break;
      case "fill":
        response = await Cloudinary.genFill(public_id, { height, width, ar: data.aspectRatio });
        break;
      case "recolor":
        response = await Cloudinary.recolor(public_id, {
          objectToRecolor: data.prompt,
          color: data.color,
          height,
          width,
        });
        break;
      case "remove":
        response = await Cloudinary.genRemove(public_id, {
          prompt: data.prompt,
          height,
          width,
        });
        break;
      case "restore":
        response =await Cloudinary.genRestore(public_id, {
          height,
          width
        });
        break;
      default:
        console.error("invalid type");
    }
    console.log("transformation response: ", response);
    return response?.transformedUrl ?? null;
  };

   const handleSubmit = async () => {
    if(!user || userId === '' || user?.creditBalance === 0)  return;
    try {
      setLoading(true);
      const uploadedImage = await Cloudinary.uploadBase64Image(base64 ?? "");
      console.log("uploadedImage: ", uploadedImage);
      if (uploadedImage) {
        const {width, public_id, height, secure_url} = uploadedImage.image;
        const transformedUrl = await handleTransform(type, {height, width, public_id});
        if(transformedUrl === null) throw new Error("Failed to transform image");
        const transformData: ITransformationData = {
          downloads: 0,
          height: height,
          width: width,
          ownerId: userId,
          ogImgUrl: secure_url,
          public_id,
          title: data.title,
          transformationType: type,
          created_at: new Date(),
          aspectRatio: data.aspectRatio,
          color: data.color === "" ? undefined : data.color,
          prompt: data.prompt === "" ? undefined : data.prompt,
          usersWhoDownloaded: [],
          transImgUrl: transformedUrl,
          userIds: [],
        };
        // save to db
        const savedData = await createUserTransformation(transformData);
        console.log("savedData: ", savedData);
        // deduct 1 credit
        const newBalance = await updateCredits(userId, 1, "dec");
        // update user credits in store
        updateUserInfo({...user, creditBalance: newBalance });
        // update cache
        setCache('transformations', [savedData, ...(getCache('transformations') ?? [])]);
        // set the new transformation as the current and navigate to the transformation page
        setCurrent(savedData);
        router.navigate(
          "Root",
          {
            screen: "MainTabs",
            params: {
              screen: "Transformation",
              params: {
                screen: "TransformationDetail",
                params: {
                  id: savedData.$id,
                },
              },
            },

          }
        );
      } else {
        Alert.alert("Error", "Please upload an image.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <View className="flex-1 py-8 px-3">
      <View className="my-4 ">
        <GradientHeading>{formInfo.heading}</GradientHeading>
        <View className="mt-1.5" />
        <Text style={{ color: Colors.neutral }} className="w-[90%]">
          {formInfo.subText}
        </Text>
      </View>
      <FormField
        label="Image Title"
        handleChangeText={handleChange}
        placeholder="Enter Image Title"
        value={data.title}
      />
      {(type === "recolor" || type === "remove") && (
        <FormField
          label={type === "recolor" ? "Object to Recolor" : "Object to Remove"}
          placeholder="Enter prompt"
          handleChangeText={handleChange}
          value={data.prompt}
        />
      )}
      {type === "recolor" && (
        <FormField
          label="Replacement Color"
          placeholder="Enter Color"
          handleChangeText={handleChange}
          value={data.color}
        />
      )}
      {type === "fill" && (
        <View className="mb-5">
          <Text style={{ color: Colors.labelText }} className="mb-3">
            Aspect Ratio
          </Text>
          <Dropdown
            data={aspectRatios}
            label={"Select Size"}
            onSelect={handleDropdownChange}
          />
        </View>
      )}
      <View className="mt-4">
        {url ? (
          <View className="h-[300px] rounded-md overflow-hidden justify-center items-center">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              colors={Colors.multiColorGradient}
              className="h-full w-full items-center justify-center overflow-hidden"
            >
              <Image
                source={{ uri: url }}
                className="h-[98%] w-[98%] rounded-md"
              />
            </LinearGradient>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handlePress}
            className="h-[300px] border-dotted border justify-center items-center border-white"
            style={{ backgroundColor: Colors.secondary }}
          >
            <View
              style={{ backgroundColor: Colors.primary }}
              className="h-[60px] mb-1.5 w-[60px] p-2 flex rounded-full items-center justify-center"
            >
              <Feather name="plus" size={26} color="white" />
            </View>
            <Text style={{ color: Colors.neutral }} className="text-center">
              Click to upload Image
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="mt-5" />
      <GradientButton /* onPress={handleSubmit} */>
        {loading ? <ActivityIndicator color="white" /> : "Transform"}
      </GradientButton>
      <Options />
    </View>
  );
}
