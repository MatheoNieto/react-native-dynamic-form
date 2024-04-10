import * as FileSystem from "expo-file-system";
import { DownloadFilesType } from "@utils/types";

class DownloadFilesService {
  static instance: DownloadFilesService;
  private downloadResumable: FileSystem.DownloadResumable | undefined;
  static getInstance() {
    if (!DownloadFilesService.instance) {
      DownloadFilesService.instance = new DownloadFilesService();
    }
    return DownloadFilesService.instance;
  }

  public createDownloadFiles({
    url,
    name,
    callback,
    options = {},
  }: DownloadFilesType) {
    this.downloadResumable = FileSystem.createDownloadResumable(
      url,
      `${FileSystem.documentDirectory}${name}`,
      options,
      () => callback && callback(),
    );
  }

  public async startDownloadFile(): Promise<string> {
    try {
      if (!this.downloadResumable) {
        return Promise.reject(
          "Create the download before starting the download",
        );
      }

      const infoFileDownload = await this.downloadResumable.downloadAsync();
      if (!infoFileDownload) return Promise.reject("Error downloading file");
      return Promise.resolve(infoFileDownload.uri);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default DownloadFilesService.getInstance();
