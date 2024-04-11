import React from "react";
import { Skeleton } from "moti/skeleton";
import { Box, Card, IconButton, Text } from "@ui/components";
import ViewerFiles from "@components/InputFileUploadAutomatic/ViewerFiles";
import { Ionicons } from "@expo/vector-icons";
import GetIconType from "@components/InputFileUploadAutomatic/GetIconType";

type Props = {
  name: string;
  type: string;
  linkAttachment: string;
  downloadFile?: boolean;
  onRemove?: () => void;
  withIcon?: boolean;
  isLoading?: boolean;
};
const CardAttachment: React.FC<Props> = ({
  name,
  type,
  linkAttachment,
  downloadFile = true,
  onRemove,
  withIcon = false,
  isLoading = false,
}) => {
  const [visibleViewer, setVisibleViewer] = React.useState(false);
  const handleShowImage = () => {
    setVisibleViewer(true);
  };

  return (
    <>
      <Card onPress={handleShowImage}>
        <Skeleton show={isLoading} colorMode="light">
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {withIcon && <GetIconType />}
            <Text variant="bodySmallRegular" numberOfLines={2}>
              {name}
            </Text>
            {onRemove && (
              <IconButton
                onPress={() => onRemove()}
                icon={
                  <Ionicons
                    name="close-circle-outline"
                    size={30}
                    color="#1F3552"
                  />
                }
              />
            )}
          </Box>
        </Skeleton>
      </Card>

      <ViewerFiles
        nameFile={name}
        typeFile={type}
        url={linkAttachment}
        visible={visibleViewer}
        onClose={() => setVisibleViewer(false)}
        download={downloadFile}
      />
    </>
  );
};

export default CardAttachment;
