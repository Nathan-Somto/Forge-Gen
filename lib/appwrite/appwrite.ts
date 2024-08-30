import { Account, Avatars, Client, Databases } from "react-native-appwrite";



const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? '',
  platform: "com.company.forge-gen",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? '',
  userCollectionId: "66d1fb6e002e74f1c3e3"
}
let client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

let account = new Account(client);
let database = new Databases(client);
let avatar = new Avatars(client);
export {account,database, avatar, appwriteConfig}