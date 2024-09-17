import { ID, Models, Query } from "react-native-appwrite";
import { appwriteConfig, database } from "./appwrite";
import { FetchFunctionResult } from "@/hooks/useCursor";
type TransformationResult = ITransformation & Models.Document;
type TransformationData = Models.Document & ITransformationData;
const convertToTransResult = (
  data: TransformationData[]
): TransformationResult[] => {
  return data.map((item) => ({
    ...item,
    transData: {
      prompt: item?.prompt,
      color: item?.color,
      aspectRatio: item?.aspectRatio,
    },
  }));
};
export const getTransformations = async (
  lastId: string | null,
  pageSize: number
): Promise<FetchFunctionResult<TransformationResult>> => {
  const query = [Query.orderDesc("created_at"), Query.limit(pageSize)];
  if (lastId) {
    query.push(Query.cursorAfter(lastId));
  }
  const data = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    query
  );
  console.log("getTranformations: ",data);
  return {
    data: convertToTransResult(
      data.documents as unknown as TransformationData[]
    ),
    lastId: data.documents.length === 0 ? null : data.documents[data.documents.length - 1]?.$id,
    hasMore: data.total > pageSize,
  };
};
export const getUserTransformations = async (accountId: string) => {
  const query = [
    Query.equal("ownerId", accountId),
    Query.orderDesc("created_at"),
  ];

  const data = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    query
  );
  return convertToTransResult(
    data.documents as unknown as TransformationData[]
  );
};
export const getUserTransformationsQuery = async (
  accountId: string,
  query: "liked" | "downloaded"
) => {
  const q = query === "liked" ? "userIds" : "usersWhoDownloaded";

  const data = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    [Query.contains(q, [accountId]), Query.orderDesc("created_at")]
  );

  return convertToTransResult(
    data.documents as unknown as TransformationData[]
  );
};
export const createUserTransformation = async (
  data: ITransformationData
): Promise<TransformationResult> => {
  const createddata: TransformationData = await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    ID.unique(),
    data
  );
  return  convertToTransResult([createddata])[0];
};
export const updateTransformationDownloadCount = async (
  transformationId: string,
  userId: string
) => {
  const transformation: TransformationData =
    await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transCollectionId,
      transformationId
    );
  const usersWhoDownloaded = transformation.usersWhoDownloaded;
  const isInList = usersWhoDownloaded.includes(userId);
  if (!isInList) {
    usersWhoDownloaded.push(userId);
  }

  return await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    transformationId,
    { usersWhoDownloaded, downloads: transformation.downloads + 1 }
  );
};
export const likeTransformation = async (
  transformationId: string,
  userId: string
) => {
  const transformation: Models.Document & ITransformation =
    await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transCollectionId,
      transformationId
    );
  const userIds = transformation.userIds;
  if (userIds.includes(userId)) {
    userIds.splice(userIds.indexOf(userId), 1);
  } else {
    userIds.push(userId);
  }
  return await database.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    transformationId,
    { userIds }
  );
};
export const deleteTransformation = async (transformationId: string) => {
 return await database.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.transCollectionId,
    transformationId
  );
}