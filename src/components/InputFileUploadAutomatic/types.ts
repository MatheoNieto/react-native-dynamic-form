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
