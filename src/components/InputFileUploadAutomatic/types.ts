export type InputFileProps = {
  selectedFiles?: () => void;
  multiple?: boolean;
  typeFiles?: "images" | "pdf" | "all";
  copyToCacheDirectory?: boolean;
  onChange?: (dataFiles?: FileSelectedType[]) => void;
  label?: string;
  isRequired?: boolean;
  noConcatenation?: boolean;
  defaultValue?: FileSelectedType[];
};

export const MediaTypes = {
  images: "image/*",
  pdf: "pdf/*",
  all: "*/*",
};

export type FileSelectedType = {
  mimeType: string;
  uri: string;
  fileSize: number;
  fileName: string;
};

export type FileUploaded = {
  original_name: string;
  job_file_id: string;
  file_url: string;
};
