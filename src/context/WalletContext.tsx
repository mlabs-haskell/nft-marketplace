import { createContext, useState, FC, useContext } from 'react';

export type Wallet = { name: 'Test'; address: string } | { name: 'None' };

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
    setConnected({ name: 'Test', address: 'abcd1234' });

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
