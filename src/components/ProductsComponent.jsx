import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { CartItemCounter } from '../context/CartItemCounter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import { useGetAllProductsQuery } from '../redux/features/products/productsApi';

export default function ProductsComponent({ products, getProducts }) {

    const { data, error, isLoading } = useGetAllProductsQuery();

    let count = useContext(CartItemCounter);

    let [cartItem, setCartItem] = useState({}),
        [inCart, setInCart] = useState(),
        [isIntersecting, setIsIntersecting] = useState(""),
        [rel, setRel] = useState(false);

    let ref = useRef(null);

    let [items, setItems] = useState([]);

    let [validation, setValidation] = useState([]);

    let [disabled, setDisabled] = useState();

    // let checkSingleProduct = (product) => {
    //     items.map(async item => {
    //         if (item.id === product.id) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: 'Oops...',
    //                 text: 'You can not add the same item twice'
    //             })
    //         }
    //     })
    // }

    // async function postDataInCart(product) {
    //     let response = await fetch(`http://localhost:1111/cart`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8'
    //         },
    //         body: JSON.stringify({
    //             ...product,
    //             inCart: true
    //         })
    //     })
    //     return response.json();
    // }

    // let getItem = () => {
    //     fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    // }

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    // useEffect(() => {
    //     getItem();
    // }, [cart])



    return (
        <div ref={ref} className={`products_container ps-5 pe-5`}>
            {
                data?.map((product) =>
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
                // products.map((product) =>
                //     <Card key={product.id} className={`product_card mt-4`}>
                //         <div className="image">
                //             <Card.Img variant="top" loading='lazy' src={product.thumbnail} />
                //             <div className="actions">
                //                 <Link to={`./edit/${[product.id]}`} className='btn btn-light me-3'>Edit</Link>
                //                 <Button className={`btn btn-light me-3`} onClick={() => {
                //                     handleAddToCart(product)
                //                 }}>Send item to cart</Button>
                //             </div>
                //         </div>
                //         <Card.Body className='card_body'>
                //             <NavLink className="text-dark" to={`./${[product.id]}`}><Card.Title>{product.title}</Card.Title></NavLink>
                //             <Card.Text>
                //                 $ {product.price}
                //             </Card.Text>
                //         </Card.Body>
                //     </Card>
                // )
            }
        </div>
    )
}
