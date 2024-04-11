import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import {
  FileSelectedType,
  FileUploaded,
} from "@components/InputFileUploadAutomatic/types";
import { mapFilesFormData } from "@components/InputFileUploadAutomatic/utils";
import PreviewFilesSelectedUpload from "@components/InputFileUploadAutomatic/PreviewFilesSelectedUpload";
import InputFile from "@components/InputFileUploadAutomatic/InputFile";

type Props = {
  label: string;
  typeFiles: "images" | "pdf" | "all";
  onChange: (data: string) => void;
  selectedFiles?: () => void;
  multiple?: boolean;
  previewFiles?: boolean;
  copyToCacheDirectory?: boolean;
  typeInputFile?: "container" | "button";
  isRequired?: boolean;
  buttonStyle?: ViewStyle;
  labelButtonStyle?: TextStyle;
  onRemoveFile?: (indexFile: number) => void;
  defaultValue?: FileUploaded[];
};

const InputFileUploadAutomatic: React.FC<Props> = ({
  label,
  typeFiles,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [listFiles, setListFiles] = React.useState<FileSelectedType[]>([]);
  const [filesUploaded, setFilesUploaded] = React.useState<FileUploaded[]>([]);

  React.useEffect(() => {
    if (!defaultValue || defaultValue.length === 0) return;
    const mapperFiles: FileUploaded[] = defaultValue.map((info) => ({
      ...info,
    }));
    setFilesUploaded(mapperFiles);
  }, [defaultValue]);

  React.useEffect(() => {
    if (listFiles.length > 0) {
      uploadFilesPending(listFiles);
    }
  }, [listFiles]);

  const uploadFilesPending = (dataPending: FileSelectedType[]) => {
    const filesAdd = mapFilesFormData(dataPending);
  };
  const handleChangeFiles = (dataFiles: FileSelectedType[] | undefined) => {
    if (!dataFiles?.length || listFiles.length > 0) return;

    setListFiles([...listFiles, ...dataFiles]);
  };

  const handleRemoveFile = (indexFile: number) => {
    const dataFiltered = filesUploaded.filter(
      (_, index) => index !== indexFile,
    );
    setFilesUploaded(dataFiltered);
  };

  return (
    <>
      <InputFile
        {...rest}
        multiple
        label={label}
        typeFiles={typeFiles}
        onChange={handleChangeFiles}
        noConcatenation={true}
      />
      <PreviewFilesSelectedUpload
        filesUploading={listFiles}
        files={filesUploaded}
        onRemove={handleRemoveFile}
      />
    </>
  );
};

export default InputFileUploadAutomatic;
