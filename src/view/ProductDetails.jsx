import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';

export default function ProductDetails() {

    const { t } = useTranslation();

    const params = useParams();

    const [productDetails, setProductDetails] = useState({}),
        [images, setImages] = useState([]);

    let getProductDetails = () => {
        fetch(`http://localhost:1111/products/${params.productId}`).then((res) => res.json()).then((data) => {
            setProductDetails(data);
            setImages(data.images)
        })
    }

    useEffect(() => {
        getProductDetails();
    }, [])

    return (
        <div className="wrapping">
            <>
                <Carousel className='carousel text-center bg-dark' fade>
                    <Carousel.Item>
                        <img src={images[0]} alt="dsds" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={images[2]} alt="dsdsd" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={images[3]} alt="dsdsd" />
                    </Carousel.Item>
                </Carousel>
                <div className="content m-3">
                    <div className="heading d-flex justify-content-between">
                        <div className="title">
                            <h3>{productDetails.title}</h3>
                            <p>{productDetails.description}</p>
                        </div>
                        <div className="rating">
                            <h4>$ {productDetails.price}</h4>
                            <p>{productDetails.discountPercentage}% OFF</p>
                            <p>{t("available_stock")} {productDetails.stock}</p>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}
