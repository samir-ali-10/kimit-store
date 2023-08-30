import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function ProductsComponent({ products, getProducts }) {

    let [cartItem, setCartItem] = useState({}),
        [inCart, setInCart] = useState();

    let [items, setItems] = useState([]);

    let [validation, setValidation] = useState([]);

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


    // async function postData(product) {
    //     let response = await fetch(`http://localhost:1111/products`, {
    //         method: 'PUT',
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
    async function postDataInCart(product) {
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
        return response.json();

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

    let click = () => {
        console.log(items);
    }


    return (
        <div className='products_container'>
            {
                products.map((product) =>
                    <Card key={product.id} className='product_card mt-4'>
                        <Card.Img variant="top" loading='lazy' src={product.thumbnail} />
                        <Card.Body className='bg-dark'>
                            <Card.Title className='text-white'>{product.title}</Card.Title>
                            <Card.Text className='text-white'>
                                {product.price} $
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='bg-dark'>
                            <Link to={`./${[product.id]}`} className='btn btn-light me-3'>Show More...</Link>
                            <Link to={`./edit/${[products.id]}`} className='btn btn-success me-3'>Edit</Link>
                            <Button className='btn btn-danger me-3' onClick={() => deleteProduct(product)}>Delete</Button>
                            {
                                product.inCart
                                    ? <div style={{ "color": "#FFF" }}>Added to cart</div>
                                    : <Button className='btn btn-secondary mt-3' onClick={() => postDataInCart(product)}>Send item to cart</Button>
                            }
                            <button onClick={click}>click</button>
                        </Card.Footer>
                    </Card>
                )
            }
        </div>
    )
}
