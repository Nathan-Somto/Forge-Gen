import { Avatars, ID } from "react-native-appwrite";
import { account, appwriteConfig, avatar, database } from "./appwrite";

export const login = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};
export const createUser = async (
  accountId: string,
  username: string,
  email: string,
  avatarUrl: string
) => {
  await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    {
      accountId,
      username,
      email,
      avatarUrl,
      credits: 0,
      downloads: 0,
    }
  );
};
export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const newAccount = await account.create(email, password, username);
  if (!newAccount) throw new Error("Account creation failed");
  const avatarUrl = avatar.getInitials(username);
  await login(email, password);
  return await createUser(newAccount.$id, username, email, avatarUrl as unknown as string);
};
export const googleLogin = async () => {};
export const logout = async () => {
  return await account.deleteSession("current");
};
export const getCurrentUser = async () => {
    const currentUser = await account.get();
    if (!currentUser) throw new Error("User not found");
    return await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
       currentUser.$id
    );
};
export const updateUser = async (userId: string, data: {
    email?: string;
    username?: string;
    avatarUrl?: string;
    credits?: number;
    downloads?: number;
}) => {
    return await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        data
    );
}