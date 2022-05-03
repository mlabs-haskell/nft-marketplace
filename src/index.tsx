import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { MsgContextProvider } from 'context/MsgContext';
import { UIContextProvider } from 'context/UIContext';
import { WalletContextProvider } from 'context/WalletContext';
import { NftContextProvider } from 'context/NftContext';
import { getAppConfig } from 'utils/appConfig';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './assets/scss/app.scss';
import './index.scss';

axios.interceptors.request.use(
  async (config) => {
    config.baseURL = getAppConfig().api.baseUrl;

    config.headers['Content-Type'] = 'application/json';
    config.headers.Accept = 'application/json';

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <MsgContextProvider>
      <UIContextProvider>
        <WalletContextProvider>
          <NftContextProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  borderRadius: '5px',
                  background: '#fff',
                  color: '#333',
                  padding: 16,
                  paddingLeft: 19,
                  maxWidth: '100%',
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
                error: {
                  duration: 7000,
                  style: {
                    backgroundColor: '#C83130',
                    color: '#fff',
                  },
                },
                success: {
                  duration: 7000,
                  style: {
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#333',
                    padding: 16,
                    paddingLeft: 19,
                    maxWidth: '100%',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  },
                },
              }}
            />
            <App />
          </NftContextProvider>
        </WalletContextProvider>
      </UIContextProvider>
    </MsgContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
