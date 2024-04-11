import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  formatImages,
  formatPdf,
} from "@components/InputFileUploadAutomatic/utils";

type GetIconTypeProps = {
  type?: string;
  imageUrl?: string;
};
const GetIconType: React.FC<GetIconTypeProps> = ({ type, imageUrl }) => {
  const isImage = type ? formatImages.includes(type) : false;
  const isPdf = type ? formatPdf.includes(type) : false;

  if (isImage && !!imageUrl) {
    return <Ionicons name="images" size={30} color="black" />;
  }

  if (isPdf) {
    return <FontAwesome5 name="file-pdf" size={30} color="black" />;
  }

  return <Ionicons name="attach-outline" size={30} color="black" />;
};

const styles = StyleSheet.create({
  sizeIcons: { width: 20, height: 20, marginRight: 10 },
});
export default GetIconType;
