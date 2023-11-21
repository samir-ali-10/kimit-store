import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import { CartItemCounter } from '../context/CartItemCounter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';

export default function ProductsComponent({ products, getProducts }) {

    let count = useContext(CartItemCounter);

    let [cartItem, setCartItem] = useState({}),
        [inCart, setInCart] = useState(),
        [isIntersecting, setIsIntersecting] = useState(""),
        [rel, setRel] = useState(false);

    let ref = useRef(null);

    let [items, setItems] = useState([]);

    let [validation, setValidation] = useState([]);

    let [disabled, setDisabled] = useState();
    
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }



    return (
        <div ref={ref} className={`products_container ps-5 pe-5`}>
            {
                products.map((product) =>
                    <Card key={product.id} className={`product_card mt-4`}>
                        <div className="image">
                            <Card.Img variant="top" loading='lazy' src={product.thumbnail} />
                            <div className="actions">
                                <Link to={`./edit/${[product.id]}`} className='btn btn-light me-3'>Edit</Link>
                                <Button className={`btn btn-light me-3`} onClick={() => {
                                    handleAddToCart(product)
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
