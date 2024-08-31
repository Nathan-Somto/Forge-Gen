import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { generativeFill } from "@cloudinary/url-gen/qualifiers/background";
import {
  ar1X1,
  ar16X9,
  ar4X3,
} from "@cloudinary/url-gen/qualifiers/aspectRatio";
import { upload, uploadBase64 } from "cloudinary-react-native";
import {
  generativeRecolor,
  generativeRemove,
  generativeRestore,
  removeBackground,
} from "@cloudinary/url-gen/actions/effect";
const cld = new Cloudinary({
  cloud: {
    cloudName: "dusntt9g1",
  },
  url: {
    secure: true,
    shorten: true,
  },
});
export interface SuccessResponse {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
}
export interface ErrorResponse {
    message: string;
}
export const cldUpload = async (
  file: string,
  onSucess: (succRes: SuccessResponse) => void,
  onError: (errRes:ErrorResponse) => void
) => {
  await uploadBase64(cld, {
    file,
    options: {
      upload_preset: "",
      unsigned: true,
    },
    callback: (error, response) => {
      if(error){
        onError({message:error.message});
        return;
      }
        onSucess({
            secure_url: response?.secure_url ?? '',
            public_id: response?.public_id ?? '',
            width: response?.width ?? 0,
            height: response?.height ?? 0,
        });
    },
  });
};
interface Options {
  width: number;
  height: number;
}
interface GenFillOptions extends Options {
  ar: "1:1" | "4:3" | "16:9";
}
interface GenRemoveOptions extends Options {
  prompt: string;
}
interface GenRecolorOptions extends Options {
  objectToRecolor: string;
  color: string;
}
export const genFill = (
  public_id: string,
  { width, height, ar }: GenFillOptions
) => {
  let aspectRatio = ar1X1();
  switch (ar) {
    case "4:3":
      aspectRatio = ar4X3();
      break;
    case "16:9":
      aspectRatio = ar16X9();
      break;
    default:
      aspectRatio = ar1X1();
  }
  return cld
    .image(public_id)
    .resize(
      pad()
        .width(width)
        .height(height)
        .aspectRatio(aspectRatio)
        .background(generativeFill())
    )
    .toURL();
};
export const bgRemoval = (public_id: string, _options?: Options) => {
  return cld.image(public_id).effect(removeBackground()).toURL();
};
export const imgRestore = (public_id: string, _options?: Options) => {
  return cld.image(public_id).effect(generativeRestore()).toURL();
};
export const genRemove = (public_id: string, { prompt }: GenRemoveOptions) => {
  return cld.image(public_id).effect(generativeRemove().prompt(prompt)).toURL();
};
export const genRecolor = (
  public_id: string,
  { objectToRecolor, color }: GenRecolorOptions
) => {
  return cld
    .image(public_id)
    .effect(generativeRecolor(objectToRecolor, color))
    .toURL();
};
