import { NftListing } from 'cardano-transaction-lib-seabug';
import {
  createContext,
  useState,
  FC,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { Nft } from 'types/nfts';

export type UIContextType = {
  home: {
    scrollPosition: number;
    handleScroll: () => void;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    incrementCurrentPage: () => void;
    filterByOwner: (value: Nft[], key: string[]) => Nft[];
    filterByOnSale: (value: Nft[]) => Nft[];
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

  const filterByOwner = (ownerNfts: Nft[], key: string[]) =>
    ownerNfts.filter((nft) => key.includes(nft.metadata.ownerPkh));

  // TODO: Remove filter logic if no longer required
  const filterByOnSale = (ownerNfts: Nft[]) => ownerNfts;

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
