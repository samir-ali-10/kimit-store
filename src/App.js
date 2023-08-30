import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import About from './view/About';
import Products from './view/Products';
import Cart from './view/Cart';
import ProductDetails from './view/ProductDetails';
import './sass/App.scss';
import { useContext, useEffect, useState } from 'react';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import EngTrans from "./locale/en.json";
import ArTrans from "./locale/ar.json";
import EditProduct from './view/EditProduct';
import AddProduct from './view/AddProduct';

function App() {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: EngTrans
        },
        ar: {
          translation: ArTrans
        }
      },
      lng: "en",
      fallbackLng: "en",

      interpolation: {
        escapeValue: false
      }
    });

  let theme = useContext(ThemeContext)

  let [cart, setCart] = useState([]);

  let handleCart = (item) => {
    if(cart.indexOf(item) !== -1) {
      return;
    }
    else {
      setCart([...cart, item]);
    }
    console.log(cart);
  }

  return (
    <div className={`App ${theme.theme}`}>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products handleCart={handleCart} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products/edit/:productId' element={<EditProduct/>} />
        <Route path='/addProduct' element={<AddProduct/>} />
      </Routes>
    </div>
  );
}

export default App;
