import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { FileSelectedType } from "@components/InputFileUploadAutomatic/types";

const getNameImagePicker = (uri: string) => {
  const str = uri.split("/");
  return str[str.length - 1] ?? `imagePicker${Math.random()}`;
};

export const mapperDataFiles = (
  dataFile?: DocumentPicker.DocumentPickerResult,
  dataImage?: ImagePicker.ImagePickerResult["assets"],
): FileSelectedType[] => {
  if (dataFile && dataFile.canceled === false) {
    return dataFile.assets.map((file) => ({
      mimeType: file.mimeType ?? "",
      uri: file.uri,
      fileSize: file.size ?? 30,
      fileName: file.name,
    }));
  }

  if (!dataImage) return [];

  return dataImage.map((asset) => ({
    mimeType: asset.type ?? "Image",
    uri: asset.uri,
    fileSize: asset.fileSize ?? 20,
    fileName: getNameImagePicker(asset.uri),
  }));
};

export const formatImages = ["gif", "png", "bmp", "jpeg", "jpg"];
export const formatPdf = ["pdf"];

export const get_url_extension = (url: string) => {
  if (!url) return "";

  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};
