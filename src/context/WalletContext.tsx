import { createContext, useState, FC, useContext } from 'react';
import { getCtl } from 'ctl';
import { WalletOption } from 'seabug-contracts';
import { MsgContext } from './MsgContext';

export type WalletInfo = {
  name: WalletOption;
  pkh: string;
  lovelace: bigint;
};

export type TransactionCborHex = string;

export type TransactionHash = string;

export type WalletContextType = {
  connected?: WalletInfo;
  connect: (walletOption: WalletOption) => void;
  /** Updates `connected` with the wallet's current lovelace balance */
  updateLovelace: () => Promise<void>;
};

export const WalletContext = createContext<WalletContextType>({
  connect: () => {},
  updateLovelace: () => Promise.reject(),
});

// TODO: Implement actual wallet connection logic
export const WalletContextProvider: FC = ({ children }) => {
  const { messages, addMessage } = useContext(MsgContext);
  const [connected, setConnected] = useState<WalletInfo>();

  const connect = async (walletOption: WalletOption): Promise<void> => {
    try {
      const ctlSeabug = await getCtl();
      const pkh = await ctlSeabug.getWalletPkh();
      const lovelace = await ctlSeabug.getWalletLovelace();
      setConnected({
        name: walletOption,
        pkh: pkh || '',
        lovelace,
      });
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg:
          'Unable to connect to wallet, please ensure Nami is installed and reload the page.',
        debugMsg: err,
      });
    }
  };

  const updateLovelace = async () => {
    if (!connected) return;
    const ctlSeabug = await getCtl();
    const lovelace = await ctlSeabug.getWalletLovelace();
    setConnected((c) => {
      if (!c) return undefined;
      return { ...c, lovelace };
    });
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connect,
        updateLovelace,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () =>
  useContext<WalletContextType>(WalletContext);
