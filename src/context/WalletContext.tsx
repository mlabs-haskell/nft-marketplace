import { createContext, useState, FC, useContext } from 'react';
import { getCtl } from 'ctl';
import { WalletOption } from 'seabug-contracts';

export type WalletInfo = {
  name: WalletOption;
  pkh: string;
};

export type TransactionCborHex = string;

export type TransactionHash = string;

export type WalletContextType = {
  connected?: WalletInfo;
  connect: (walletOption: WalletOption) => void;
  getLovelace: () => Promise<any>;
};

export const WalletContext = createContext<WalletContextType>({
  connect: () => {},
  getLovelace: () => Promise.reject(),
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const [connected, setConnected] = useState<WalletInfo>();

  const connect = async (walletOption: WalletOption): Promise<void> => {
    const ctlSeabug = await getCtl();
    const pkh = await ctlSeabug.getWalletPkh();

    setConnected({
      name: walletOption,
      pkh: pkh || '',
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
