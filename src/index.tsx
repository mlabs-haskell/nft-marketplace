import React from 'react';
import ReactDOM from 'react-dom';
import axios, { AxiosRequestConfig } from 'axios';
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
  console.log(config);

  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <NftContextProvider>
      <App />
    </NftContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
