import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import menuIcon from "../imgs/hamburger-menu-icon-clipart-3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faLanguage, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { useDispatch, useSelector } from 'react-redux';
import { CHANGETOARABIC } from "../redux/actions/types";

export default function Nav() {

    const { t } = useTranslation();

    const [listVisibility, setListVisibility] = useState(""),
        [items, setItems] = useState([]);

    let menuActive = () => {
        if (listVisibility === "") {
            setListVisibility("active");
        }
        else {
            setListVisibility("")
        }
    }


    // let checkVisibility = () => {
    //     setListVisibility(window.innerWidth === "550px"? "active" : "")
    // }

    // window.addEventListener("resize", checkVisibility)

    let theme = useContext(ThemeContext);



    if (i18n.language === "ar") {
        document.body.classList.add("rtl");
    }
    else {
        document.body.classList.remove("rtl");
    }

    let lang = useSelector(state => state.language);
    let dispatch = useDispatch();

    let changeToArabic = () => {
        dispatch({ type: CHANGETOARABIC })
    }

    let getCartItems = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    useEffect(() => {
        getCartItems();
    }, [items])

    return (

        <div className='nav_bar bg-dark sticky'>
            <nav>
                <h2 className='text-light'>Kimit Store</h2>
                <div onClick={menuActive} className="menuIcon">
                    <img src={menuIcon} alt="menu icon" />
                </div>
                <ul className={listVisibility}>
                    <li>
                        <NavLink to="/">{t("products")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">{t("about")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addProduct">{t("add_product")}</NavLink>
                    </li>
                </ul>
                <div className="icons d-flex align-items-center">
                    <FontAwesomeIcon onClick={theme.toggleTheme} className='me-2 ms-2 fs-5' icon={faSun} />
                    <FontAwesomeIcon onClick={changeToArabic} className='me-2 fs-5' icon={faLanguage} />
                    <div className="cart_items">
                        <NavLink to="/cart" className="me-2 fs-5"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
                        <span>{items.length}</span>
                    </div>
                </div>
            </nav>
        </div>

    )
}
