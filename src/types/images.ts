export namespace ImagesType {
  export interface Image {
    path: string;
    createdAt?: string;
    title: string;
    sha256hash: string;
    id: number;
  }

  export interface AddImageResponse {
    sha256hash: string;
  }
}
  