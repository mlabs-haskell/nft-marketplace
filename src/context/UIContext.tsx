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

  return (
    <UIContext.Provider
      value={{
        home: {
          scrollPosition,
          handleScroll,
          currentPage,
          setCurrentPage,
          incrementCurrentPage,
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
