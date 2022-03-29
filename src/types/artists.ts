/* eslint-disable */
export namespace ArtistsType {
  export interface Artist {
    name: string;
    createdAt: Date;
    pubKeyHash: string;
    id: string;
    imagePath: string;
  }

  export interface ArtistResponse {
    name: string;
  }
}
