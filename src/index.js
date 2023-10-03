import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/app/store';
// import {store_one} from './reduxtk/store'
import CounterProvider from './context/CartItemCounter';
import DataProvider from './context/PersonData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <ThemeProvider>
        <DataProvider>
          <CounterProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </CounterProvider>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
