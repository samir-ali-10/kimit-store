import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import ProductsComponent from '../components/ProductsComponent';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';

export default function Products({ handleCart }) {
    const { t } = useTranslation();

    let [products, setProducts] = useState([]),
        [categories, setCategories] = useState([]);

    let baseUrl = 'http://localhost:1111';

    let getProducts = () => {
        fetch(`${baseUrl}/products`).then((res) => res.json()).then((data) => setProducts(data));
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
        <div className='text-center pt-4'>
            <div className="title ps-3">
                <h1 className='mb-4'>{t('products')}</h1>
            </div>
            {
                products.length > 0
                    ?
                    <>
                        <ButtonGroup className='category' aria-label="Basic example">
                            <Button variant="secondary" onClick={getProducts}>All</Button>
                            {
                                categories.map((category, index) =>
                                    <Button variant="secondary" onClick={() => productFilter(category)} key={index}>{category}</Button>
                                )
                            }
                        </ButtonGroup>
                        <ProductsComponent handleCart={handleCart} products={products} getProducts={getProducts} />
                    </>
                    :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }
        </div>
    )
}
