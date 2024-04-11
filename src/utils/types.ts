import { DownloadOptions } from "expo-file-system";

export type DownloadFilesType = {
  url: string;
  name: string;
  callback?: () => void;
  options?: DownloadOptions;
};
