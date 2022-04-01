import { Pagination } from './shared';

export interface Image {
  path: string;
  createdAt?: Date;
  title: string;
  sha256hash: string;
  id: number;
  description: string;
  ipfsHash: string;
}

export interface ImageResponse {
  data: Image[];
  headers: Pagination;
}
export interface AddImageResponse {
  sha256hash: string;
}
