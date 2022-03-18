import {
  createContext,
  useState,
  FC,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { InformationNft } from 'seabug-sdk/src/common';

export type UIContextType = {
  home: {
    scrollPosition: number;
    handleScroll: () => void;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    incrementCurrentPage: () => void;
    filterByOwner: (value: InformationNft[], key: string[]) => InformationNft[];
    filterByOnSale: (value: InformationNft[]) => InformationNft[];
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

  const filterByOwner = (ownerNfts: InformationNft[], key: string[]) =>
    ownerNfts.filter((nft) => key.includes(nft.owner.pubKeyHash));

  const filterByOnSale = (ownerNfts: InformationNft[]) =>
    ownerNfts.filter(
      (nft) =>
        nft.price ||
        (nft?.auctionState?.deadline && nft.auctionState.deadline < new Date())
    );

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
