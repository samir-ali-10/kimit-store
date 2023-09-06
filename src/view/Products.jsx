import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import ProductsComponent from '../components/ProductsComponent';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ToTopButton from '../components/ToTopButton';

export default function Products({ handleCart }) {
    const { t } = useTranslation();

    let [products, setProducts] = useState([]),
        [categories, setCategories] = useState([]),
        [constant, setConstant] = useState();

    let baseUrl = 'http://localhost:1111';

    let getProducts = () => {
        fetch(`${baseUrl}/products`).then((res) => res.json()).then((data) => {
            setProducts(data)
            setConstant(data[3].thumbnail)
        });
    }

    let getCategories = () => {
        fetch(`${baseUrl}/categories`).then((res) => res.json()).then((data) => setCategories(data))
    }

    let productFilter = (category) => {
        fetch(`${baseUrl}/${category}`).then((res) => res.json()).then((data) => setProducts(data))
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])




    return (
        <>
            <div className='products text-center'>
                {
                    products.length !== 0
                        ?
                        <>
                            <div className="title_product mb-5">
                                {
                                    <>
                                        <div className="image">
                                            <img src={constant} alt="" />
                                        </div>
                                        <div className='info'>
                                            <h1>{t(`select_your_perfect_product`)}</h1>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusamus <br /> illum est iure aliquam reiciendis fugit minus aspernatur dolor ratione?</p>
                                            <NavLink to="/about"><Button className='btn btn-dark'>{t("about")}</Button></NavLink>
                                        </div>
                                    </>
                                }
                            </div>
                            <>
                                <div className="category">
                                    <button className='bg-dark' onClick={getProducts}>All</button>
                                    {
                                        categories.map((category, index) =>
                                            <button className='bg-dark' onClick={() => productFilter(category)} key={index}>{category}</button>
                                        )
                                    }
                                </div>
                                <ProductsComponent handleCart={handleCart} products={products} getProducts={getProducts} />
                            </>
                        </>

                        :
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                }
            </div>
            <ToTopButton />
        </>
    )
}
