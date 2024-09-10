import { Alert } from "react-native";
import { useAuth } from "./useAuth";
import { useCache } from "./useCache";
import { downloadImage } from "@/utils";
import {
  updateDownloads,
  updateTransformationDownloadCount,
} from "@/lib/appwrite";
import React from "react";

export const useDownloadImage = () => {
const [isPending, setIsPending] = React.useState(false);
  const {
    auth: { user },
    updateUserInfo,
  } = useAuth();
  const { setCache, getCache } = useCache();
  const userId = user?.$id ?? "";
  const creditBalance = user?.creditBalance || 0;
  const handleImgDownload = async ({
    title,
    url,
    transId,
  }: {
    title: string;
    url: string;
    transId: string;
  }) => {
    if (!user || isPending) return;
    setIsPending(true)
    try {
      if (creditBalance <= 0) throw new Error("Insufficient credits");
      const downloadResult = await downloadImage(url, title);
      if(!downloadResult) throw new Error("Failed to download image");
      console.log("Download result path: ", downloadResult);
      const userDownloads = await updateDownloads(userId, 1, "inc_downloads");
      const updatedUser = {
        ...user,
        downloadsLeft: userDownloads.downloadsLeft,
        downloads: userDownloads.downloads,
      };
      updateUserInfo(updatedUser);
      const transResult = await updateTransformationDownloadCount(
        transId,
        userId
      );
      if (transResult) {
        const cache: ITransformation[] = getCache("transformations") ?? [];
        const updatedCache = cache.map((item) => {
          if (item.$id === transId) {
            return {
              ...item,
              downloads: transResult.downloads,
              usersWhoDownloaded: transResult.usersWhoDownloaded,
            };
          }
          return item;
        });
        setCache("transformations", updatedCache);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to download image", error);
      }
      Alert.alert("Error", "Failed to download image");
    }
    finally{
        setIsPending(false)
    }
  };
  return {
    handleImgDownload,
    isPending
  }
};
