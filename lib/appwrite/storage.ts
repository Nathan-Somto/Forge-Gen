import { ID } from "react-native-appwrite"
import { appwriteConfig, storage } from "./appwrite"
export type AppwriteFile = {
    name: string;
    type: string;
    size: number;
    uri: string;
}
export const uploadAvatar = async (file: AppwriteFile) => {
    return storage.createFile(appwriteConfig.bucketId, ID.unique(), file, ["*"]);
}
export const getAvatarUrl = (fileId: string) => {
    return storage.getFileView(appwriteConfig.bucketId, fileId).toString();
}