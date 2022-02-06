import { createContext, useState, FC, useContext } from 'react';

export type UIContextType = {
  scrollPosition: number;
  handleScroll: () => void;
  currentPage: number;
  handelPageChange: (value: number) => void;
};

export const UIContext = createContext<UIContextType>({
  scrollPosition: 0,
  handleScroll: () => {},
  currentPage: 1,
  handelPageChange: () => {},
});

export const UIContextProvider: FC = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const handelPageChange = (value: number) => {
    setCurrentPage(value + 1);
  };

  return (
    <UIContext.Provider
      value={{
        scrollPosition,
        handleScroll,
        currentPage,
        handelPageChange,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext<UIContextType>(UIContext);
