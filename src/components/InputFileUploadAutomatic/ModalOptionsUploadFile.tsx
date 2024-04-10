import React from "react";

import { StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  FileSelectedType,
  MediaTypes,
} from "@components/InputFileUploadAutomatic/types";
import { mapperDataFiles } from "@components/InputFileUploadAutomatic/utils";
import { Box, Button } from "@ui/components";

type Props = {
  files: FileSelectedType[];
  openModal: boolean;
  onOpenModal: (open: boolean) => void;
  multiple: boolean;
  setFiles: (dataFiles: FileSelectedType[]) => void;
  typeFiles?: "images" | "pdf" | "all";
  copyToCacheDirectory?: boolean;
  noConcatenation?: boolean;
};
const ModalOptionsUploadFile: React.FC<Props> = ({
  files,
  setFiles,
  openModal,
  onOpenModal,
  multiple,
  typeFiles = "all",
  copyToCacheDirectory = false,
  noConcatenation = false,
}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = React.useState<
    "granted" | "undetermined" | "denied"
  >("undetermined");
  const typeMedia = MediaTypes[typeFiles];

  React.useEffect(() => {
    ImagePicker.getCameraPermissionsAsync().then(({ status }) => {
      requestCameraPermission().catch((err) =>
        console.log("Camera permission error::", err),
      );
    });
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setCameraPermissionStatus(status);
  };

  const handlePickerFiles = () => {
    DocumentPicker.getDocumentAsync({
      multiple,
      copyToCacheDirectory,
      type: typeMedia,
    }).then((data) => {
      if (data.canceled) return;
      const dataMap = mapperDataFiles(data);
      if (!multiple || noConcatenation) {
        setFiles(dataMap);
        return;
      }
      setFiles([...files, ...dataMap]);
    });
  };

  const dontPermit = () => {
    Alert.alert(
      "Camera permission is required to pick an image from the camera.",
    );
    requestCameraPermission().catch((err) =>
      console.log("Camera permission error::", err),
    );
  };
  const pickImage = (takePhoto = false) => {
    onOpenModal(false);

    const configPicker: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: multiple,
    };

    if (takePhoto) {
      if (cameraPermissionStatus !== "granted") {
        return dontPermit();
      }

      ImagePicker.launchCameraAsync(configPicker).then((result) => {
        if (result.canceled) return;
        const dataMap = mapperDataFiles(undefined, result.assets);
        if (!multiple || noConcatenation) {
          setFiles(dataMap);
          return;
        }
        setFiles([...files, ...dataMap]);
      });
      return;
    }

    ImagePicker.launchImageLibraryAsync(configPicker)
      .then((result) => {
        if (result.canceled) return;
        const dataMap = mapperDataFiles(undefined, result.assets);
        if (!multiple || noConcatenation) {
          setFiles(dataMap);
          return;
        }
        setFiles([...files, ...dataMap]);
      })
      .catch((error) =>
        console.log("[launchImageLibraryAsync] error::", error),
      );
  };

  if (!openModal) return null;

  return (
    <Box style={styles.modalMenu}>
      {typeFiles !== "pdf" && (
        <>
          <Button variant="text" onPress={() => pickImage()}>
            Photo Library
          </Button>
          <Button variant="text" onPress={() => pickImage(true)}>
            Take Photo
          </Button>
        </>
      )}
      <Button
        variant="text"
        onPress={() => {
          handlePickerFiles();
          onOpenModal(false);
        }}
      >
        Choose Files
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  modalMenu: {
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
    shadowRadius: 16,
    shadowColor: "rgba(47, 51, 80, 0.12)",
    shadowOpacity: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    bottom: 40,
    right: 10,
    backgroundColor: "white",
  },
});

export default ModalOptionsUploadFile;
