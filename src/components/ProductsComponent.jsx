import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { CartItemCounter } from '../context/CartItemCounter';

export default function ProductsComponent({ products, getProducts }) {

    let [cartItem, setCartItem] = useState({}),
        [inCart, setInCart] = useState(),
        [heart, setHeart] = useState("favorite_icon regular"),
        [isIntersecting, setIsIntersecting] = useState("");

    let ref = useRef(null);

    let [items, setItems] = useState([]);

    let [validation, setValidation] = useState([]);

    let [disabled, setDisabled] = useState();

    let deleteProduct = (product) => {
        Swal.fire({
            icon: 'error',
            title: 'Are you sure you delete',
            text: `${product.title}`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`http://localhost:1111/products/${product.id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(getProducts);
            }
        })
    }


    async function postDataInCart(product) {
        if (items.length === 0) {
            let response = await fetch(`http://localhost:1111/cart`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    ...product,
                    inCart: true
                })
            })
            // getProducts()
            reload();
            return response.json();
        }
        else {
            items.map(async item => {
                if (product.id === item.id) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'You can not add the same item twice'
                    })
                }
                else {
                    let response = await fetch(`http://localhost:1111/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        body: JSON.stringify({
                            ...product,
                            inCart: true
                        })
                    })
                    // getProducts()
                    reload();
                    return response.json();
                }
            }
            )
        }

    }

    // let addCart = (item, check) => {
    //     setCartItem(item);
    //     setInCart(check)
    // }

    let getItem = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    useEffect(() => {
        getItem();
    }, [])

    let handleFavorite = (e) => {
        setHeart(heart === "favorite_icon regular" ? "favorite_icon solid" : "favorite_icon regular")
    }

    let reload = () => {
        window.location.reload()
    }

    let check = (e) => {
        items.map(item =>
            e.id === item.id && setDisabled("disabled")
        )
    }


    return (
        <div ref={ref} className={`products_container ps-5 pe-5`}>
            {
                products.map((product) =>
                    <Card key={product.id} className={`product_card mt-4`}>
                        <div className="image">
                            <FontAwesomeIcon className={`${heart} text-info`} onClick={() => handleFavorite(product)} icon={heart === "favorite_icon regular" ? faHeart : faHeartSolid} />
                            <Card.Img variant="top" loading='lazy' src={product.thumbnail} />
                            <div className="actions">
                                <Link to={`./edit/${[product.id]}`} className='btn btn-light me-3'>Edit</Link>
                                <Button className='btn btn-light me-3' onClick={() => deleteProduct(product)}>Delete</Button>
                                <Button className={`btn btn-light me-3`} onClick={() => {
                                    postDataInCart(product)
                                }}>Send item to cart</Button>
                            </div>
                        </div>
                        <Card.Body className='card_body'>
                            <NavLink className="text-dark" to={`./${[product.id]}`}><Card.Title>{product.title}</Card.Title></NavLink>
                            <Card.Text>
                                $ {product.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
        </div>
    )
}
