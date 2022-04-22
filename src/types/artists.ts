import { PaginationHeaders } from './shared';

export interface Artist {
  name: string;
  createdAt: Date;
  pubKeyHash: string;
  id: number;
  imagePath: string;
}

export interface AxiosArtistResponse {
  data: Artist[];
  headers: PaginationHeaders;
}
