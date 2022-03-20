import React from 'react';
import ReactDOM from 'react-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { Toaster } from 'react-hot-toast';
import { UIContextProvider } from 'context/UIContext';
import { WalletContextProvider } from 'context/WalletContext';
import { NftContextProvider } from 'context/NftContext';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './assets/scss/app.scss';
import './index.scss';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token != null) {
    config.headers.common.Authorization = `${token}`;
  }
  config.baseURL = process.env.REACT_APP_BASE_URL;

  config.headers.common['Content-Type'] = 'application/json';
  config.headers.common.Accept = 'application/json';

  return config;
});

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
