import { Account, Avatars, Client, Databases, Storage } from "react-native-appwrite";



const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? '',
  platform: "com.nathansomto.forgegen",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? '',
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID ?? '',
  transCollectionId: process.env.EXPO_PUBLIC_APPWRITE_TRANS_COLLECTION_ID ?? '',
  transactionsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID ?? '',
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID ?? '',
}

let client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

let account = new Account(client);
let database = new Databases(client);
let avatar = new Avatars(client);
let storage = new Storage(client);
export {account,database, avatar, appwriteConfig, storage};