import React from "react";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

type Props = {
  content: any;
};
const RenderHTMLComponent: React.FC<Props> = ({ content }) => {
  const { width } = useWindowDimensions();
  return <RenderHtml contentWidth={width} source={{ html: content }} />;
};

export default RenderHTMLComponent;
