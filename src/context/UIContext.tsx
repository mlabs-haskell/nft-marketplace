import { NftListing } from 'cardano-transaction-lib-seabug';
import {
  createContext,
  useState,
  FC,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';

export type UIContextType = {
  home: {
    scrollPosition: number;
    handleScroll: () => void;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    incrementCurrentPage: () => void;
    filterByOwner: (value: NftListing[], key: string[]) => NftListing[];
    filterByOnSale: (value: NftListing[]) => NftListing[];
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

  const filterByOwner = (ownerNfts: NftListing[], key: string[]) =>
    ownerNfts.filter((nft) =>
      key.includes(nft.metadata.seabugMetadata.ownerPkh)
    );

  // TODO: Remove filter logic if no longer required
  const filterByOnSale = (ownerNfts: NftListing[]) => ownerNfts;

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
