/* eslint-disable */
export namespace ImagesType {
  export interface Image {
    path: string;
    createdAt?: Date;
    title: string;
    sha256hash: string;
    id: number;
    description: string;
    ipfsHash: string;
  }

  export interface AddImageResponse {
    sha256hash: string;
  }
}
