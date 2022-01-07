import { createContext, useState, FC, useContext } from 'react';

export type WalletAddress = {
  pubKeyHash: string;
};

export type WalletName = 'NONE' | 'Test Wallet';

export type TransactionCborHex = string;

export type TransactionHash = string;

export type WalletContextType = {
  wallets: string[];
  connected: WalletName;
  getPubKeyHashes: () => Promise<string[]>;
  signAndSubmitTx: (tx: TransactionCborHex) => Promise<TransactionHash>;
  connect: (wallet: WalletName) => void;
  fetchWallets: () => void;
};

export const WalletContext = createContext<WalletContextType>({
  wallets: [],
  connected: 'NONE',
  getPubKeyHashes: () => Promise.resolve([]),
  signAndSubmitTx: () => Promise.resolve(''),
  connect: () => {},
  fetchWallets: () => {},
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const [wallets, setWallets] = useState<string[]>([]);
  const [connected, setConnected] = useState<WalletName>('NONE');

  const connect = (wallet: WalletName): void => {
    /* if (!wallets.includes(wallet)) {
      console.error(
        `Attempted to connect to wallet (${wallet}) that is not available`
      );
      return;
    } */

    setConnected(wallet);
  };
  const getPubKeyHashes = () => {
    switch (connected) {
      case 'Test Wallet':
        return Promise.resolve(['ff00000001']);
      default:
        return Promise.resolve([]);
    }
  };

  const fetchWallets = () => {
    const walletList = ['Test Wallet'];

    setWallets(walletList);
  };

  const signAndSubmitTx = (tx: TransactionCborHex) =>
    Promise.resolve('abcd1234');

  return (
    <WalletContext.Provider
      value={{
        wallets,
        connected,
        getPubKeyHashes,
        connect,
        signAndSubmitTx,
        fetchWallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () =>
  useContext<WalletContextType>(WalletContext);
