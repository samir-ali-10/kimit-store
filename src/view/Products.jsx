import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import ProductsComponent from '../components/ProductsComponent';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import ToTopButton from '../components/ToTopButton';
import Footer from '../components/Footer';
import laptopImage from "../imgs/apple-mouse-artificial-flowers-blurred-background-1229861.jpg";
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals } from '../redux/features/cart/cartSlice';
import { useGetAllProductsQuery } from '../redux/features/products/productsApi';

export default function Products({ handleCart }) {

    const { id } = useParams()

    const { data, error, isLoading } = useGetAllProductsQuery();

    const { t } = useTranslation();

    let [products, setProducts] = useState([]),
        [categories, setCategories] = useState([]),
        [constant, setConstant] = useState();

    let baseUrl = 'https://dummyjson.com/products';

    // let getProducts = () => {
    //     fetch(`${baseUrl}`).then((res) => res.json()).then((data) => {
    //         setProducts(data.products)
    //     });
    // }

    let getCategories = () => {
        fetch(`${baseUrl}/categories`).then((res) => res.json()).then((data) => setCategories(data))
    }

    let productFilter = (category) => {
        fetch(`${baseUrl}/category/${category}`).then((res) => res.json()).then((data) => setProducts(data.products))
    }

    useEffect(() => {
        // getProducts();
        getCategories();
    }, [])

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    return (
        <>
            <Nav />
            <div className='products text-center'>
                {
                    isLoading
                        ?

                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <>
                            <div className="title_product mb-5">
                                {
                                    <>
                                        <div className="image">
                                            <img src={laptopImage} alt="" />
                                        </div>
                                        <div className='info'>
                                            <h1>{t(`select_your_perfect_product`)}</h1>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusamus <br /> illum est iure aliquam reiciendis fugit minus aspernatur dolor ratione?</p>
                                            <NavLink to="/about"><Button className='btn btn-light'>{t("about")}</Button></NavLink>
                                        </div>
                                    </>
                                }
                            </div>
                            <>
                                <div className="category">
                                    {/* <button className='bg-dark' onClick={getProducts}>All</button> */}
                                    {
                                        categories.map((category, index) =>
                                            <button className='bg-dark' onClick={() => productFilter(category)} key={index}>{category}</button>
                                        )
                                    }
                                </div>
                                <ProductsComponent handleCart={handleCart} products={products} />
                            </>
                        </>
                }
            </div>
            <ToTopButton />
            <Footer />
        </>
    )
}
