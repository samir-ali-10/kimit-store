import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import menuIcon from "../imgs/hamburger-menu-icon-clipart-3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faLanguage, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { useDispatch, useSelector } from 'react-redux';
// import { CHANGETOARABIC } from "../redux/actions/types";
import { CartItemCounter } from '../context/CartItemCounter';
import { Button } from 'bootstrap';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { PersonData } from '../context/PersonData';
import { arabic } from '../redux/features/langauge/languageSlice';

export default function Nav() {

    const { t } = useTranslation();

    const [listVisibility, setListVisibility] = useState(""),
        [items, setItems] = useState([]);

    const [lastScrollY, setLastScrollY] = useState(0),
        [show, setShow] = useState(true);

    let menuActive = () => {
        if (listVisibility === "") {
            setListVisibility("active");
        }
        else {
            setListVisibility("")
        }
    }

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    let theme = useContext(ThemeContext);



    if (i18n.language === "ar") {
        document.body.classList.add("rtl");
    }
    else {
        document.body.classList.remove("rtl");
    }

    
    let getCartItems = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    const lang = useSelector(state => state.lang.language)
    const cart = useSelector((state) => state.cart.quantity)
    const dispatch = useDispatch()

    useEffect(() => {
        getCartItems();
    }, [cart])

    let data = useContext(PersonData);

    
    useEffect(() => {
        localStorage.setItem("lang", lang)
    }, [lang])
    
    return (
        
        <div className={`nav_bar bg-dark ${show === true ? "active" : ""}`}>
            <nav>
                <h2 className='text-light'>Kimit Store</h2>
                <div onClick={menuActive} className="menuIcon">
                    <img src={menuIcon} alt="menu icon" />
                </div>
                <ul className={listVisibility}>
                    <li>
                        <NavLink to="/products">{t("products")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">{t("about")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addProduct">{t("add_product")}</NavLink>
                    </li>
                    <li>
                        <button onClick={menuActive} className='bg-info'><FontAwesomeIcon className='text-white' icon={faX} /></button>
                    </li>
                </ul>
                <div className="icons d-flex align-items-center">
                    <FontAwesomeIcon onClick={theme.toggleTheme} className='me-2 ms-2 fs-5' icon={faSun} />
                    <FontAwesomeIcon onClick={() => dispatch(arabic())} className='me-2 fs-5' icon={faLanguage} />
                    <div className="cart_items">
                        <NavLink to="/cart" className="me-2 fs-5"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
                        <span>{items.length}</span>
                    </div>
                    {
                        data.logged === "false" ? <NavLink to="/" className='login_btn ms-3'>Login</NavLink> : <NavLink><FontAwesomeIcon className='user fs-4' icon={faUser} /></NavLink>
                    }
                </div>
            </nav>
        </div>

    )
}
