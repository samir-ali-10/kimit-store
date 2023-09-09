import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import CounterProvider from './context/CartItemCounter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <ThemeProvider>
        <CounterProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CounterProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
