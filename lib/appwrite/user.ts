import { Avatars, ID, Models, Query } from "react-native-appwrite";
import { account, appwriteConfig, avatar, database } from "./appwrite";

export const signIn = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};
export const createUser = async (
  accountId: string,
  username: string,
  email: string,
  avatarUrl: string
): Promise<Models.Document & IUser> => {
  const data: IUser = {
    accountId,
    username,
    email,
    avatarUrl,
    creditBalance: 10,
    downloads: 0,
  };
  return await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    data
  );
};
export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const newAccount = await account.create(ID.unique(), email, password, username);
  if (!newAccount) throw new Error("Account creation failed");
  const avatarUrl = avatar.getInitials(username);
  await signIn(email, password);
  return await createUser(
    newAccount.$id,
    username,
    email,
    avatarUrl as unknown as string
  );
};
export const googleLogin = async () => {};
export const logout = async () => {
  return await account.deleteSession("current");
};
export const getCurrentUser = async (): Promise<Models.Document & IUser> => {
  const currentUser = await account.get();
  if (!currentUser) throw new Error("User not found");
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentUser.$id)]
  );
  return users.documents[0] as Models.Document & IUser;
};
export const updateUser = async (
  userId: string,
  data: {
    email?: string;
    username?: string;
    avatarUrl?: string;
    credits?: number;
    downloads?: number;
  }
) => {
  return await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    data
  );
};
