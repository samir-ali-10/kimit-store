import { faCreditCard, faCreditCardAlt, faHeart, faUser, faVcard } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useTransition } from 'react'
import { Container, NavLink } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

export default function Footer() {

    let [categories, setCategories] = useState([]);

    let { t } = useTranslation();

    let baseUrl = 'https://dummyjson.com/products';

    let getCategories = () => {
        fetch(`${baseUrl}/categories`).then((res) => res.json()).then((data) => setCategories(data))
    }

    useEffect(() => {
        getCategories();
    }, [])


    return (
        <footer className='bg-dark text-white'>
            <Container>
                <div className="infos">
                    <div className="info">
                        <h3>{t("about_us")}</h3>
                        <ul>
                            <li>{t("careers")}</li>
                            <li>{t("terms_condition")}</li>
                            <li>{t("privacy_policy")}</li>
                            <li>{t("responsibility")}</li>
                        </ul>
                    </div>
                    <div className="info">
                        <h3>{t("help")}</h3>
                        <ul>
                            <li>{t("deliver")}</li>
                            <li>{t("returns")}</li>
                            <li>{t("secure_payments")}</li>
                            <li>{t("contact_us")}</li>
                        </ul>
                    </div>
                    <div className="info">
                        <h3>{t("categories")}</h3>
                        <ul>
                            {
                                categories.map((category, index) =>
                                    <li key={index}>{category}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="about_us d-flex justify-content-between">
                    <div className="payment mb-5">
                        <h3>{t("supported_payment_methods")}</h3>
                        <ul className='d-flex bg-white'>
                            <li className='me-2'><FontAwesomeIcon icon={faVcard} /></li>
                            <li className='me-2'><FontAwesomeIcon icon={faCreditCard} /></li>
                            <li className='me-2'><FontAwesomeIcon icon={faCreditCardAlt} /></li>
                        </ul>
                    </div>
                    <div className="socials">
                        <h3>{t("follow_us")}</h3>
                        <ul className='d-flex'>
                            <NavLink><FontAwesomeIcon className='text-white me-3' icon={faUser} /></NavLink>
                            <NavLink><FontAwesomeIcon className='text-white me-3' icon={faUser} /></NavLink>
                            <NavLink><FontAwesomeIcon className='text-white me-3' icon={faUser} /></NavLink>
                        </ul>
                    </div>
                </div>
            </Container>
            <div className="copyright d-flex justify-content-between">
                <p className='mb-3'>Copyright © 2019 - All rights reserved.</p>
                <p>Made with <FontAwesomeIcon className='text-danger' icon={faHeart} /> by Samir</p>
            </div>
        </footer>
    )
}
