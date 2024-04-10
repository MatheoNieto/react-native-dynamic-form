import React from "react";
import { Dimensions } from "react-native";
import {
  formatImages,
  formatPdf,
} from "@components/InputFileUploadAutomatic/utils";
import { BottomSheet, BottomSheetRef } from "react-native-sheet";
import { downloadFilesService } from "@utils";
import * as Sharing from "expo-sharing";
import ViewerImage from "@components/InputFileUploadAutomatic/ViewerImage";
import { Box, Button, Text } from "@ui/components";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  typeFile: string;
  nameFile: string;
  url: string;
  visible: boolean;
  onClose?: () => void;
  download?: boolean;
};
const { height: heightScreen } = Dimensions.get("screen");

const ViewerFiles: React.FC<Props> = ({
  typeFile,
  nameFile,
  url,
  visible,
  onClose,
  download = true,
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const isPdf = formatPdf.includes(typeFile);
  const isImage = formatImages.includes(typeFile);
  const bottomSheet = React.useRef<BottomSheetRef>(null);

  downloadFilesService.createDownloadFiles({
    url: url,
    name: `${nameFile.replace(/[^\w]/g, "")}.${typeFile}`,
  });

  React.useEffect(() => {
    if (visible) {
      bottomSheet.current?.show();
    } else {
      bottomSheet.current?.hide();
    }
  }, [visible]);

  const handleDownload = () => {
    setDownloading(true);
    downloadFilesService.startDownloadFile().then((data) => {
      Sharing.shareAsync(data).then(() => setDownloading(false));
    });
  };

  if (isImage) {
    return (
      <ViewerImage
        visible={visible}
        source={{ uri: url }}
        onClose={() => onClose && onClose()}
        onLongPress={() => handleDownload()}
      />
    );
  }

  if (isPdf) {
    return (
      <BottomSheet
        height={heightScreen}
        ref={bottomSheet}
        draggable={false}
        sheetStyle={{ backgroundColor: "white" }}
      >
        <Box>
          <Text>Rendering PDF</Text>
        </Box>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      height={350}
      ref={bottomSheet}
      draggable={false}
      onCloseFinish={() => onClose && onClose()}
      sheetStyle={{ backgroundColor: "white" }}
    >
      <Box p="m">
        <AntDesign name="unknowfile1" size={24} color="black" />
        <Text variant="headerBold">Sorry, unsupported media type</Text>
        {download && (
          <Button isLoading={downloading} onPress={() => handleDownload()}>
            Download file
          </Button>
        )}
      </Box>
    </BottomSheet>
  );
};
export default ViewerFiles;
