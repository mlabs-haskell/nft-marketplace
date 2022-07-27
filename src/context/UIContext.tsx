import {
  createContext,
  useState,
  FC,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { NftImage } from 'types/common';

export type UIContextType = {
  home: {
    scrollPosition: number;
    handleScroll: () => void;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    incrementCurrentPage: () => void;
    filterByOwner: (value: NftImage[], key: string[]) => NftImage[];
    filterByOnSale: (value: NftImage[]) => NftImage[];
    filterState: FilterState;
    setFilterState: Dispatch<SetStateAction<FilterState>>;
  };
};
export type FilterState = 'ALL' | 'SALES' | 'COLLECTION';

export const UIContext = createContext<UIContextType>({} as UIContextType);

export const UIContextProvider: FC = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>('ALL');

  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const incrementCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const filterByOwner = (ownerNfts: NftImage[], key: string[]) =>
    ownerNfts.filter((nftImage) =>
      key.includes(nftImage.nft.metadata.ownerPkh)
    );

  // TODO: Remove filter logic if no longer required
  const filterByOnSale = (ownerNfts: NftImage[]) => ownerNfts;

  return (
    <UIContext.Provider
      value={{
        home: {
          scrollPosition,
          handleScroll,
          currentPage,
          setCurrentPage,
          incrementCurrentPage,
          filterByOwner,
          filterByOnSale,
          filterState,
          setFilterState,
        },
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext<UIContextType>(UIContext);
