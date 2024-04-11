import React from "react";
import ImageView from "react-native-image-viewing";
import { View } from "react-native";
import { IconButton } from "@ui/components";
import { Ionicons } from "@expo/vector-icons";
type ImagesType = {
  uri: string;
};

type ViewerImageProps = {
  source: ImagesType;
  visible: boolean;
  onClose?: () => void;
  onLongPress?: () => void;
  FooterComponent?: React.ReactElement;
};
const ViewerImage: React.FC<ViewerImageProps> = ({
  source,
  visible,
  onClose,
  onLongPress,
}) => {
  return (
    <ImageView
      images={[source]}
      imageIndex={0}
      visible={visible}
      doubleTapToZoomEnabled
      onRequestClose={() => onClose && onClose()}
      FooterComponent={() => (
        <View style={{ paddingVertical: 20 }}>
          <IconButton
            onPress={() => onLongPress && onLongPress()}
            icon={<Ionicons name="share-outline" size={25} color="white" />}
          />
        </View>
      )}
    />
  );
};

export default ViewerImage;
