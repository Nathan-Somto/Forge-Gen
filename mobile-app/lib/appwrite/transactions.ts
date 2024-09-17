import { ID, Models, Query } from "react-native-appwrite";
import { appwriteConfig, database } from "./appwrite";
export type TransactionData = Models.Document & ITransaction;
export const createTransaction = async (
  data: ITransaction
): Promise<TransactionData> => {
  return await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.transactionsCollectionId,
    ID.unique(),
    data
  );
};

export const getUserTransactions = async (
  userId: string
): Promise<TransactionData[]> => {
  const data = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.transactionsCollectionId,
    [Query.equal("buyer", userId)]
  );
  return data.documents as unknown as TransactionData[];
};
