import { Pagination } from './shared';

export interface Artist {
  name: string;
  createdAt: Date;
  pubKeyHash: string;
  id: string;
  imagePath: string;
}

export interface ArtistResponse {
  data: Artist[];
  // headers: Pagination;
}
