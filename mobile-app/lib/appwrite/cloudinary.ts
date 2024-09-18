import { ExecutionMethod } from "react-native-appwrite";
import { appwriteConfig, functions } from "./appwrite";

interface Options {
    width: number;
    height: number;
}
interface RemoveOptions extends Options {
    prompt: string;
}
interface RecolorOptions extends Options {
   objectToRecolor: string;
   color: string;
}
interface GenFillOptions extends Options {
    ar: '1:1' | '4:3' | '16:9';
}
export interface TransformationResponse{
    transformedUrl: string;
    publicId: string;
    message: string;
}
interface UploadApiResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: "image" | "video" | "raw" | "auto";
    created_at: string;
    tags: Array<string>;
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    moderation: Array<string>;
    access_control: Array<string>;
    context: object; 
    metadata: object; 
    colors?: [string, number][];

    [futureKey: string]: any;
}
export interface UploadBase64Response {
    image: UploadApiResponse;
    message: string;
}
const uploadBase64Image = async (base64Image: string): Promise<UploadBase64Response> => {
    const result = await functions.createExecution(
    appwriteConfig.cldfunctionId,
    JSON.stringify({ base64Image }),
    false,
    "/upload",
    ExecutionMethod.POST
  );
  console.log("execution result: in create", result);
  const data = JSON.parse(result.responseBody);
  return data;
};
 const genRemove = async (publicId: string, options: RemoveOptions): Promise<TransformationResponse> => {
    const execution = await functions.createExecution(
        appwriteConfig.cldfunctionId,
        JSON.stringify({ publicId, ...options }),
        false,
        "/transformation_url_gen/remove",
        ExecutionMethod.POST
    );
    const data = JSON.parse(execution.responseBody);
    return data;
}
 const genRestore = async (publicId: string, options: Options): Promise<TransformationResponse> => {
    const execution = await functions.createExecution(
        appwriteConfig.cldfunctionId,
        JSON.stringify({ publicId, ...options }),
        false,
        "/transformation_url_gen/restore",
        ExecutionMethod.POST
    );
    const data = JSON.parse(execution.responseBody);
    return data;
}
 const genFill = async (publicId: string, options: GenFillOptions): Promise<TransformationResponse> => {
    const execution = await functions.createExecution(
        appwriteConfig.cldfunctionId,
        JSON.stringify({ publicId, ...options }),
        false,
        "/transformation_url_gen/fill",
        ExecutionMethod.POST
    );
    const data = JSON.parse(execution.responseBody);
    return data;
}
const recolor = async (publicId: string, options: RecolorOptions): Promise<TransformationResponse> => {
    const execution = await functions.createExecution(
        appwriteConfig.cldfunctionId,
        JSON.stringify({ publicId, ...options }),
        false,
        "/transformation_url_gen/recolor",
        ExecutionMethod.POST
    );
    const data = JSON.parse(execution.responseBody);
    return data;
}
const bgRemove = async (publicId: string, options: Options): Promise<TransformationResponse> => {
    const execution = await functions.createExecution(
        appwriteConfig.cldfunctionId,
        JSON.stringify({ publicId, ...options }),
        false,
        "/transformation_url_gen/removeBackground",
        ExecutionMethod.POST
    );
    const data = JSON.parse(execution.responseBody);
    return data;
}

export const Cloudinary = {
    uploadBase64Image,
    genRemove,
    genRestore,
    genFill,
    bgRemove,
    recolor
}