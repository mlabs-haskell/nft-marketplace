import { PaginationHeaders } from './shared';

export interface Image {
  path: string;
  createdAt?: Date;
  title: string;
  sha256hash: string;
  id: number;
  description: string;
  ipfsHash: string;
}

export interface AxiosImageResponse {
  data: Image[];
  headers: PaginationHeaders;
}
export interface AddImageResponse {
  sha256hash: string;
}
