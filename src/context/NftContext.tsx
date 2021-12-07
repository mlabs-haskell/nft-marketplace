import { createContext, useContext, FC, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
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

export const NftContext = createContext<NftContextType>({} as NftContextType);

interface Props {
  children: React.ReactNode;
}

export const NftContextProvider: FC<Props> = ({ children }) => {
  const [image, setImage] = useState<[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await getImage();
      setImage(data);
      setImageLoading(false);
    } catch (err) {
      const error = err as AxiosError;
    }
  }, []);

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

export const useNftContext = () => useContext<NftContextType>(NftContext);
