import React from "react";
import { FlatList, View } from "react-native";
import { get_url_extension } from "@components/InputFileUploadAutomatic/utils";
import {
  FileSelectedType,
  FileUploaded,
} from "@components/InputFileUploadAutomatic/types";
import CardAttachment from "@components/InputFileUploadAutomatic/CardAttachment";

type PreviewFilesSelectedProps = {
  files: FileUploaded[];
  filesUploading: FileSelectedType[];
  onRemove: (indexFile: number) => void;
};

const PreviewFilesSelectedUpload: React.FC<PreviewFilesSelectedProps> = ({
  files,
  onRemove,
  filesUploading,
}) => {
  const renderFiles = ({
    item,
    index,
  }: {
    item: FileUploaded;
    index: number;
  }) => {
    const extensionAttachment = get_url_extension(item.file_url.toLowerCase());
    if (!extensionAttachment) return null;
    return (
      <CardAttachment
        name={item.original_name}
        type={extensionAttachment}
        linkAttachment={item.file_url}
        downloadFile={false}
        onRemove={() => onRemove(index)}
      />
    );
  };

  const renderFilesUploading = ({
    item,
    index,
  }: {
    item: FileSelectedType;
    index: number;
  }) => {
    return (
      <CardAttachment
        name={item.fileName}
        type=""
        linkAttachment={item.uri}
        downloadFile={false}
        onRemove={() => onRemove(index)}
        isLoading={true}
      />
    );
  };

  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <FlatList
        data={files}
        keyExtractor={(_, index) => `auto-file-uploaded-${index}`}
        renderItem={renderFiles}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
      <FlatList
        data={filesUploading}
        keyExtractor={(_, index) => `auto-file-uploading-${index}`}
        renderItem={renderFilesUploading}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default PreviewFilesSelectedUpload;
