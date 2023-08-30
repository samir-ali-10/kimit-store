import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import menuIcon from "../imgs/hamburger-menu-icon-clipart-3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faLanguage } from '@fortawesome/free-solid-svg-icons'
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function Nav() {

    const { t } = useTranslation();

    const [listVisibility, setListVisibility] = useState("");

    let menuActive = () => {
        if (listVisibility === "") {
            setListVisibility("active");
        }
        else {
            setListVisibility("")
        }
    }

    let changeLan = () => {
        i18n.language === "en"? i18n.changeLanguage("ar") : i18n.changeLanguage("en");
    }

    // let checkVisibility = () => {
    //     setListVisibility(window.innerWidth === "550px"? "active" : "")
    // }

    // window.addEventListener("resize", checkVisibility)

    let theme = useContext(ThemeContext);

    let changeTheme = () => {
        theme.toggleTheme("light")
    }

    if(i18n.language === "ar") {
        document.body.classList.add("rtl");
    }
    else {
        document.body.classList.remove("rtl");
    }

    return (

        <div className='nav_bar bg-dark'>
            <nav>
                <h2 className='text-light'>Kimit Store</h2>
                <div onClick={menuActive} className="menuIcon">
                    <img src={menuIcon} alt="menu icon" />
                </div>
                <ul className={listVisibility}>
                    <li>
                        <NavLink to="/">{t("home")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">{t("about")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">{t("products")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">{t("cart")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addProduct">{t("add_product")}</NavLink>
                    </li>
                </ul>
                <div className="icons">
                    <FontAwesomeIcon onClick={changeTheme} className='me-2 ms-2' icon={faSun} />
                    <FontAwesomeIcon onClick={changeLan} icon={faLanguage} />
                </div>
            </nav>
        </div>

    )
}
