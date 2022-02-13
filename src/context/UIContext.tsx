import { createContext, useState, FC, useContext } from 'react';
import { InformationNft } from 'seabug-sdk/src/common';

export type UIContextType = {
  scrollPosition: number;
  handleScroll: () => void;
  currentPage: number;
  handelPageChange: (value: number) => void;
  filterByOwner: (value: InformationNft[], key: string[]) => InformationNft[];
  filterByOnSale: (value: InformationNft[]) => InformationNft[];
  filterState: FilterState;
  handleMySalesClick: () => void;
  handleMyCollectionClick: () => void;
  handleAllClick: () => void;
};
type FilterState = 'ALL' | 'SALES' | 'COLLECTION';

export const UIContext = createContext<UIContextType>({} as UIContextType);

export const UIContextProvider: FC = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>('ALL');

  const handleMySalesClick = () => setFilterState('SALES');
  const handleMyCollectionClick = () => setFilterState('COLLECTION');
  const handleAllClick = () => setFilterState('ALL');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const handelPageChange = (value: number) => {
    setCurrentPage(value + 1);
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
        scrollPosition,
        handleScroll,
        currentPage,
        handelPageChange,
        filterByOwner,
        filterByOnSale,
        filterState,
        handleMySalesClick,
        handleMyCollectionClick,
        handleAllClick,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext<UIContextType>(UIContext);
