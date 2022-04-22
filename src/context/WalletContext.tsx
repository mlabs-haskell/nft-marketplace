import { createContext, useState, FC, useContext } from 'react';
import { getCtl } from 'ctl';

export type WalletName = 'Nami';

export type WalletInfo = {
  name: WalletName;
  pkh: string;
};

export type TransactionCborHex = string;

export type TransactionHash = string;

export type WalletContextType = {
  connected?: WalletInfo;
  connect: () => void;
  getLovelace: () => Promise<any>;
};

export const WalletContext = createContext<WalletContextType>({
  connect: () => {},
  getLovelace: () => Promise.reject(),
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const [connected, setConnected] = useState<WalletInfo>();

  const connect = async (): Promise<void> => {
    const ctlSeabug = await getCtl();
    await ctlSeabug.connectWallet();

    setConnected({
      name: 'Nami',
      pkh: '', // TODO: add actual pub key hash
    });
  };

  const getLovelace = async (): Promise<any> => {
    const ctlSeabug = await getCtl();
    return ctlSeabug.getWalletLovelace();
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connect,
        getLovelace,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () =>
  useContext<WalletContextType>(WalletContext);
