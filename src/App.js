import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import About from './view/About';
import Products from './view/Products';
import Cart from './view/Cart';
import ProductDetails from './view/ProductDetails';
import './sass/App.scss';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EngTrans from "./locale/en.json";
import ArTrans from "./locale/ar.json";
import EditProduct from './view/EditProduct';
import AddProduct from './view/AddProduct';
import { useSelector } from 'react-redux';
import Login from './view/Login';
import Register from './view/Register';

function App() {

  const lang = useSelector(state => state.lang.language)

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
      lng: lang,
      fallbackLng: lang,

      interpolation: {
        escapeValue: false
      }
    });

  let theme = useContext(ThemeContext)

  return (
    <div className={`App ${theme.theme}`}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products/edit/:productId' element={<EditProduct />} />
        <Route path='/addProduct' element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
