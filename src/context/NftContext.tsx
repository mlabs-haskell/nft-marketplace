import { createContext, useState, useEffect, FC } from 'react';
import { getImage } from 'api/image';
import { getArtist } from 'api/artist';
import { ArtistsType } from 'types/artists';

export interface NftContextType {
  // images
  image: [];
  fetchImages: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
}

    const sdk = await makeSdk(url, walletId);

    const nftList = await sdk.query.listNfts();

export const NftContextProvider: FC<Props> = ({ children }) => {
  const [image, setImage] = useState<[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);

  async function validationNftsImages() {
    nfts.forEach((nft: InformationNft) => {
      const image = images.get(nft.id.contentHash);
      if (image) {
        setValidImages(
          (prev) => new Map([...prev, [nft.id.contentHash, { nft, image }]])
        );
      }
    });
  }

  const fetchArtists = useCallback(async () => {
    try {
      const newArtists = await getArtist();
      setArtists(newArtists);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <NftContext.Provider
      value={{
        images,
        fetchImages,
        image,
        imageLoading,
        fetchArtists,
        artists,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

/*
   nftList.forEach((nft: InformationNft, i: number) => {
      if (nft.id.contentHash === data[i].sha256hash) {
        setImages([...images, data[i]]);
      }
    });
*/
