import { createContext, useState, FC, useContext } from 'react';

export type WalletAddress = {
  pubKeyHash: string;
};

export type Wallet =
  | { name: 'Test'; address: WalletAddress }
  | { name: 'None' };

export type WalletContextType = {
  connected: Wallet;
  connectTestWallet: (password: string) => void;
};

export const WalletContext = createContext<WalletContextType>({
  connected: { name: 'None' },
  connectTestWallet: (password: string) => {},
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const [connected, setConnected] = useState<Wallet>({ name: 'None' });

  const connectTestWallet = (password: string) =>
    setConnected({ name: 'Test', address: { pubKeyHash: 'ff00000000' } });

  return (
    <WalletContext.Provider
      value={{
        connected,
        connectTestWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () =>
  useContext<WalletContextType>(WalletContext);
