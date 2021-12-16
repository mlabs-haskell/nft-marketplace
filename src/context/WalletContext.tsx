import { createContext, useState, FC, useContext } from 'react';

export type WalletAddress = {
  pubKeyHash: string;
};

export type WalletName = 'NONE' | 'TEST';

export type TransactionCborHex = string;

export type TransactionHash = string;

export type WalletContextType = {
  wallets: WalletName[];
  connected: WalletName;
  getPubKeyHashes: () => Promise<string[]>;
  fetchWallets: () => void;
  signAndSubmitTx: (tx: TransactionCborHex) => Promise<TransactionHash>;
  connect: (wallet: WalletName) => void;
};

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  connected: 'NONE',
  getPubKeyHashes: () => Promise.resolve([]),
  fetchWallets: () => {},
  signAndSubmitTx: () => Promise.resolve(''),
  connect: () => {},
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const [wallets, setWallets] = useState<WalletName[]>([]);
  const [connected, setConnected] = useState<WalletName>('NONE');

  const getPubKeyHashes = () => {
    switch (connected) {
      case 'TEST':
        return Promise.resolve(['ff00000001']);
      default:
        return Promise.resolve([]);
    }
  };

  const fetchWallets = () => {
    setWallets(['TEST']);
  };

  const connect = (wallet: WalletName): void => {
    if (!wallets.includes(wallet)) {
      console.error(
        `Attempted to connect to wallet (${wallet}) that is not available`
      );
      return;
    }

    setConnected(wallet);
  };

  const signAndSubmitTx = (tx: TransactionCborHex) =>
    Promise.resolve('abcd1234');

  return (
    <WalletContext.Provider
      value={{
        wallets,
        connected,
        getPubKeyHashes,
        fetchWallets,
        connect,
        signAndSubmitTx,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () =>
  useContext<WalletContextType>(WalletContext);
