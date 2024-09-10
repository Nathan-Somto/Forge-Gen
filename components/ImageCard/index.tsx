import { View, Image, TouchableOpacity, Linking, Alert } from "react-native";
import React from "react";
import { FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {  router } from "expo-router";
import { iconBtns, transformationLinks } from "@/constants/Values";
import { BtmSheetBtn } from "./BtmSheetBtn";
import { Text } from "../ui/Text";
import InsufficientCreditsSheet from "../InsufficientCoinsSheet";
import { useAuth } from "@/hooks/useAuth";
import { useTransformation } from "@/hooks/useTransformation";
import Sheet from "../ui/Sheet";
import { useCache } from "@/hooks/useCache";
import { likeTransformation } from "@/lib/appwrite";
import { useDownloadImage } from "@/hooks/useDownloadImage";
export type ImageCardProps = ITransformation;

export default function ImageCard({
  $id,
  ownerId,
  public_id,
  transformationType,
  userIds,
  title,
  transImgUrl,
  transData,
  usersWhoDownloaded,
  ogImgUrl,
  downloads,
}: ImageCardProps) {
  const {
    auth: { user },
  } = useAuth();
  const {setCache, getCache}= useCache();
  const { setCurrent } = useTransformation();
  const userId = user?.$id ?? "";
  const creditBalance = user?.creditBalance || 0;
  const downloadsLeft = user?.downloadsLeft || 0;
  const [showSheet, setShowSheet] = React.useState(false);
  const [showBtmSheet, setShowBtmSheet] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const {handleImgDownload, isPending} = useDownloadImage();
  const Icon = React.useMemo(() => {
    return (
      transformationLinks.find((item) => item.type === transformationType)
        ?.icon ?? null
    );
  }, [transformationType]);
 
  React.useEffect(() => {
    setIsLiked(userIds.includes(userId));
  },[userIds, userId]);
  const handleLike = async () => {
    try{
      setIsLiked(prev => !prev);
      const result = await likeTransformation($id, userId);
      if(result){
        const cache: ITransformation[] = getCache('transformations') ?? [] as ITransformation[];
        const updatedCache = cache.map((item) => {
          if(item.$id === $id){
            return {
              ...item,
              userIds: isLiked ? item.userIds.filter((id) => id !== userId) : [userId, ...item.userIds]
            }
          }
          return item;
        });
        setCache('transformations', updatedCache);
      }
    }
    catch(err){

    }
  };
  const handleDownload = async () => {
    try{
      if (downloadsLeft < 1) {
        setShowSheet(true);
        return;
      }
      await handleImgDownload({
        title,
        transId: $id,
        url: transImgUrl
      })
    }
    catch(e){

    }
  };
  const iconOptions = React.useMemo(
    () =>
      iconBtns.map((item) => ({
        ...item,
        handlePress: () => {
          switch (item.type) {
            case "delete":
              return handleDelete();
            case "download":
              return handleDownload();
            case "share":
              return handleShare();
          }
        },
      })).reverse(),
    []
  );
  const handleDelete = async () => {
    try{
      // delete transformation

      // update user downloads
    }catch(e){
      console.error("Failed to delete transformation", e);
      Alert.alert("Error", "Failed to delete transformation");
    }
  };
  const handleShare = async () => {
    try{
      const canOpen = await Linking.canOpenURL(transImgUrl);
      if(canOpen){
        return Linking.openURL(transImgUrl);
      }
    }catch(e){
      console.error("Failed to open image", e);
      Alert.alert("Error", "Failed to open image");
    }
  };
  const handleRedirect = () => {
    if (creditBalance < 1 && downloadsLeft < 1) {
      setShowSheet(true);
      return;
    }
    // keep it in a store
    setCurrent({
      ownerId,
      public_id,
      transformationType,
      title,
      transImgUrl,
      transData,
      usersWhoDownloaded,
      ogImgUrl,
      downloads,
      $id
    });
    router.push(`/(root)/(tabs)/transformation/${public_id}`);
  };
  return (
    <>
      <TouchableOpacity
        onPress={handleRedirect}
        className="w-full h-[250px] my-2.5 mx-1.5 "
      >
        <View className="relative w-full">
          <View className="h-[200px] rounded-lg w-full overflow-hidden">
            <Image source={{ uri: transImgUrl }} className="h-full w-full" />
          </View>
          <View className="absolute flex-row  top-3 right-4 justify-center">
            <TouchableOpacity onPress={handleLike} className="mr-3">
              {isLiked ? (
                <Entypo name="heart" color="#F21E6A" size={24} />
              ) : (
                <Feather name="heart" color={Colors.neutral} size={24} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowBtmSheet(true)}>
              <FontAwesome name="ellipsis-v"  color={Colors.neutral} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row h-[50px] px-3  items-center justify-between">
          <Text>{title}</Text>
          {Icon && <Icon SIZE={30} />}
        </View>
      </TouchableOpacity>
      <Sheet
        onClose={() =>  setShowBtmSheet(false)}
        open={showBtmSheet}
        height={0.3}
        disable={isPending}
        sheetContentStyles={{ justifyContent: "center", flex: 1 }}
      >
        {iconOptions.map((item) => (
          <BtmSheetBtn key={item.type} {...item} disable={isPending} />
        ))}
      </Sheet>
      <InsufficientCreditsSheet
        showSheet={showSheet}
        onClose={() => {
          setShowSheet(false);
        }}
      />
    </>
  );
}
