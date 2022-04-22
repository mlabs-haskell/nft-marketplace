import { createContext, useState, FC, useContext } from 'react';
import toast from 'react-hot-toast';

type AppMessage = {
  type: 'Success' | 'Error' | 'Info';
  userMsg?: string;
  debugMsg?: any;
};

export type MsgContextType = {
  messages: AppMessage[];
  addMessage: (msg: AppMessage) => void;
};

export const MsgContext = createContext<MsgContextType>({} as MsgContextType);

export const MsgContextProvider: FC = ({ children }) => {
  // Internal state
  const [messages, setMessages] = useState<AppMessage[]>([]);

  // App Messages

  const addMessage = (msg: AppMessage) => {
    if (!msg.userMsg && !msg.debugMsg) {
      console.error('Attempted to add message with no content!');
      return;
    }

    setMessages([...messages, msg]);

    if (msg.debugMsg) {
      if (msg.type === 'Error') {
        console.error(msg.debugMsg);
      } else {
        console.log(msg.debugMsg);
      }
    }
    if (msg.userMsg) {
      if (msg.type === 'Error') {
        toast.error(msg.userMsg);
      } else if (msg.type === 'Success') {
        toast.success(msg.userMsg);
      } else {
        toast(msg.userMsg);
      }
    }
  };

  return (
    <MsgContext.Provider
      value={{
        messages,
        addMessage,
      }}
    >
      {children}
    </MsgContext.Provider>
  );
};

export const useMsgContext = () => useContext<MsgContextType>(MsgContext);
