import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { iconBtns, transformationLinks } from "@/constants/Values";
import { returnUri } from "@/utils";
import { IconBtn } from "./IconBtn";
import { Text } from "../ui/Text";
import InsufficientCreditsSheet from "../InsufficientCoinsSheet";
import { useAuth } from "@/hooks/useAuth";
export type ImageCardProps = {
  title: string;
  transformationType: TransformationTypeKey;
  userIds: string[];
  originalImage: string;
  image: {
    width?: number;
    height?: number;
    config?: unknown;
    secureURL?: string;
    transformationURL: any;
    aspectRatio?: string;
    prompt?: string;
    color?: string;
  };
  ownerId: string;
  id: string;
};
/**
 *@todo: add cloudinary advanced image transformation
 */
export default function ImageCard({
  ownerId,
  id,
  transformationType,
  userIds,
  title,
  image: { transformationURL },
}: ImageCardProps) {
  const {auth: {user}} = useAuth()
  const userId = user?.accountId ?? '';
  const creditBalance = user?.creditBalance || 0
  const [showSheet, setShowSheet] = React.useState(false);
  const Icon = React.useMemo(() => {
    return (
      transformationLinks.find((item) => item.type === transformationType)
        ?.icon ?? null
    );
  }, [transformationType]);
  const isLiked = React.useMemo(() => {
    return userIds.includes(userId);
  }, [userId]);
  const handleLike = () => {
    
  };
  const handleDownload = () => {
    if (creditBalance < 1) {
      setShowSheet(true);
      return;
    }
  };
  const handleDelete = () => {};
  const handleRedirect = () => {
    if (creditBalance < 1) {
      setShowSheet(true);
      return;
    }
    // keep it in a store
    router.push(`/(root)/(tabs)/transformation/${id}`);
  };
  return (
    <>
      <TouchableOpacity
        onPress={handleRedirect}
        className="w-full h-[250px] my-2.5 mx-1.5 "
      >
        <View className="relative">
          <Image
            source={returnUri(transformationURL)}
            className="h-[200px] w-full rounded-lg"
          />
          <View className="absolute flex-row  top-3 right-2">
            {iconBtns.map((item) => {
              if (item.type === "delete" && ownerId === userId) {
                return (
                  <IconBtn
                    {...item}
                    handlePress={handleDelete}
                    key={item.type}
                  />
                );
              }
              if (item.type === "download") {
                return (
                  <IconBtn
                    {...item}
                    handlePress={handleDownload}
                    key={item.type}
                  />
                );
              }
              if (item.type === "like") {
                return (
                  <IconBtn
                    {...item}
                    handlePress={handleLike}
                    isLiked={isLiked}
                    key={item.type}
                  />
                );
              }
              return null;
            })}
          </View>
        </View>
        <View className="flex-row h-[50px] px-3  items-center justify-between">
          <Text>{title}</Text>
          {Icon && <Icon SIZE={30} />}
        </View>
      </TouchableOpacity>
      <InsufficientCreditsSheet
        showSheet={showSheet}
        onClose={() => {
          setShowSheet(false);
        }}
      />
    </>
  );
}
