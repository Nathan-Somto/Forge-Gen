import { Avatars, ID, Models, Query } from "react-native-appwrite";
import { account, appwriteConfig, avatar, database } from "./appwrite";
export type UserData = Models.Document & IUser;
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
    downloadsLeft: 50,
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
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  );
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
  data: Partial<Omit<IUser, "accountId">>
) => {
  return await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    data
  );
};
export const updateCredits = async (
  userId: string,
  credits: number,
  op: "inc" | "dec"
) => {
  const user = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId
  );
  if (!user) throw new Error("User not found");
  const newBalance =
    op === "inc" ? user.creditBalance + credits : user.creditBalance - credits;
  if (newBalance < 0) throw new Error("Insufficient credits");
  await updateUser(userId, { creditBalance: newBalance });
  return newBalance;
};
export const updateDownloads = async (userId: string, downloads: number, op: "inc_downloads" | "inc_downloads_left") => {
  const user = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId
  );
  if (!user) throw new Error("User not found");
  const newDownloads =
    op === "inc_downloads" ? user.downloads + downloads : user.downloads;
  const newDownloadsLeft = op === "inc_downloads" ? user.downloadsLeft - downloads : user.downloadsLeft + downloads;
  if (newDownloadsLeft < 0) throw new Error("Insufficient downloads");
  await updateUser(userId, { downloads: newDownloads, downloadsLeft: newDownloadsLeft });
  return { downloads: newDownloads, downloadsLeft: newDownloadsLeft };
}
