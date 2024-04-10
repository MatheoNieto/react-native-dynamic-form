import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  FileSelectedType,
  InputFileProps,
} from "@components/InputFileUploadAutomatic/types";
import { BaseTouchable, Text } from "@ui/components";
import { palette } from "@theme";
import ModalOptionsUploadFile from "@components/InputFileUploadAutomatic/ModalOptionsUploadFile";

const InputFile: React.FC<InputFileProps> = ({
  label,
  multiple = true,
  typeFiles = "all",
  onChange,
  isRequired = false,
  defaultValue = [],
  noConcatenation = false,
}) => {
  const [filesSelected, setFilesSelected] = React.useState<FileSelectedType[]>(
    [],
  );
  const [showModalMenu, setShowModalMenu] = React.useState(false);

  React.useEffect(() => {
    if (!defaultValue || defaultValue.length === 0) return;
    setFilesSelected(defaultValue);
  }, [defaultValue]);

  const setFilesAssets = (fileAssets: FileSelectedType[]) => {
    setShowModalMenu(false);
    setFilesSelected(fileAssets);
    onChange?.(fileAssets);
  };

  return (
    <>
      <BaseTouchable
        p="m"
        borderWidth={1}
        borderColor="primary"
        alignItems="center"
        justifyContent="center"
        borderRadius="s"
        onPress={() => setShowModalMenu(!showModalMenu)}
      >
        <Ionicons
          name="md-cloud-upload-outline"
          size={24}
          color={palette.primary100}
        />
        <Text variant="bodyBold">
          {label ?? "Upload"}
          {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      </BaseTouchable>
      <ModalOptionsUploadFile
        setFiles={setFilesAssets}
        files={filesSelected}
        openModal={showModalMenu}
        onOpenModal={setShowModalMenu}
        typeFiles={typeFiles}
        multiple={multiple}
        noConcatenation={noConcatenation}
      />
    </>
  );
};
export default InputFile;
