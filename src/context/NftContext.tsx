import { createContext, useContext, FC, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { getImage } from 'api/image';

export interface NftContextType {
  image: [];
  fetchImages: () => void;
  imageLoading: boolean;
}

export const NftContext = createContext<NftContextType>({} as NftContextType);

interface Props {
  children: React.ReactNode;
}

export const NftContextProvider: FC<Props> = ({ children }) => {
  const [image, setImage] = useState<[]>([]);
  const [imageLoading, setImageLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await getImage();
      setImage(data);
      setImageLoading(false);
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
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
