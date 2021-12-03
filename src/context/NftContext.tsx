import { createContext, useContext, FC, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { getImage } from 'api/image';
import { getArtist, getArtistbyId } from 'api/artist';
import { ArtistsType } from 'types/artists';

export interface NftContextType {
  // images
  image: [];
  fetchImages: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
  fetchArtistbyId: (id: string) => void;
  artistById: null;
}

export const NftContext = createContext<NftContextType>({} as NftContextType);

interface Props {
  children: React.ReactNode;
}

export const NftContextProvider: FC<Props> = ({ children }) => {
  const [image, setImage] = useState<[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);
  const [artistById, setArtistById] = useState<null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await getImage();
      setImage(data);
      setImageLoading(false);
    } catch (err) {
      const error = err as AxiosError;
    }
  }, []);

  const fetchArtists = useCallback(() => {
    try {
      const { data } = getArtist();
      setArtists(data);
    } catch (err) {
      const error = err as AxiosError;
    }
  }, []);

  const fetchArtistbyId = useCallback(async (id: string) => {
    try {
      const { data } = await getArtistbyId(id);
      setArtistById(data);
    } catch (err) {
      const error = err as AxiosError;
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
        fetchArtistbyId,
        artistById,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
