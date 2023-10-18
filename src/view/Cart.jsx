import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
import ToTopButton from '../components/ToTopButton';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCartQuantity, getTotals, removeFromCart } from '../redux/features/cart/cartSlice';
import cartImage from "../imgs/cart_image.jpg";

export default function Cart() {

    const { t } = useTranslation();

    let [items, setItems] = useState([]);

    // let getItem = () => {
    //     fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    // }

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleRemoveCartItem = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    }

    const handleDecreaseCartQuantity = (cartItem) => {
        dispatch(decreaseCartQuantity(cartItem))
    }

    const handleIncreaseCartQuantity = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    // useEffect(() => {
    //     getItem();
    // }, [cart])


    // let deleteItem = (product) => {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Are you sure you want to remove from cart',
    //         text: `${product.title}`,
    //         showCancelButton: true
    //     }).then((data) => {
    //         if (data.isConfirmed) {
    //             fetch(`http://localhost:1111/cart/${product.id}`, { method: 'DELETE' })
    //                 .then(res => res.json())
    //                 .then(getItem);
    //         }
    //     })
    // }

    return (
        <>
            <Nav />
            <div className='cart text-center pt-4'>
                <Container>
                    {
                        cart.cartItems.length === 0
                            ?
                            <div className="empty">
                                <img className='mb-5' src={cartImage} alt="" />
                                <h2 className='mb-3'>{t("the_cart_is_empty")}</h2>
                            </div>
                            :
                            cart.cartItems?.map(cartItem =>
                                <div key={cartItem.id}>
                                    <div className="cart_item d-flex justify-content-between mb-5">
                                        <div className="heading d-flex">
                                            <div className="image">
                                                <img src={cartItem.thumbnail} alt="" />
                                            </div>
                                            <div className="info">
                                                <h4 className="title">{cartItem.title}</h4>
                                                <p>${cartItem.price}</p>
                                                <span>{cartItem.description}</span>
                                            </div>
                                        </div>
                                        <div className="controls">
                                            <Button className='btn-success' onClick={() => handleIncreaseCartQuantity(cartItem)}><FontAwesomeIcon icon={faPlus} /></Button>
                                            <div className="cartItem_quantity">{cartItem.cartQuantity}</div>
                                            <Button className='btn-dark' onClick={() => handleDecreaseCartQuantity(cartItem)}><FontAwesomeIcon icon={faMinus} /></Button>
                                            <Button className='btn btn-danger' onClick={() => {
                                                handleRemoveCartItem(cartItem)
                                            }}>{t("delete")}</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    {
                        cart.cartItems.length === 0 ? "" : <Button className='clear_cart mb-5 btn-danger' onClick={() => handleClearCart()}>Clear Cart</Button>
                    }
                    <div className="total_price">
                        <p>{t("total_price_of_all_products")}: <span>${cart.cartTotalAmount}</span></p>
                    </div>
                </Container>
            </div>
            <ToTopButton />
            <Footer />
        </>

    )
}
