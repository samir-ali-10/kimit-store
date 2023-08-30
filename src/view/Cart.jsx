import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import imge from "../imgs/hamburger-menu-icon-clipart-3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

export default function Cart() {

    let [items, setItems] = useState([]);

    let getItem = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    useEffect(() => {
        getItem();
    }, [])

    let deleteItem = (product) => {
        Swal.fire({
            icon: 'error',
            title: 'Are you sure you want to remove from cart',
            text: `${product.title}`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`http://localhost:1111/cart/${product.id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(getItem);
            }
        })
    }

    return (
        <div className='cart text-center'>
            <h2 className='mt-3 mb-5'>Products in the cart</h2>
            <Container>
                {
                    items.length !== 0
                        ?
                        items.map(item =>
                            <div key={item.id} className="cart_item d-flex justify-content-between align-items-center pe-4 mb-5">
                                <div className="heading d-flex align-items-center">
                                    <div className="image me-5">
                                        <img src={item.thumbnail} alt="" />
                                    </div>
                                    <div className="info">
                                        <h4 className="title">{item.title}</h4>
                                        <p>${item.price}</p>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                                <div className="controls">
                                    <Button className='btn btn-primary me-2'><FontAwesomeIcon icon={faPlus} /></Button>
                                    <Button className='btn btn-secondary me-2'><FontAwesomeIcon icon={faMinus} /></Button>
                                    <Button className='btn btn-danger me-2' onClick={() => deleteItem(item)}>Delete</Button>
                                </div>
                            </div>
                        )
                        :
                        <h4>Cart Is Empty</h4>
                }
            </Container>
        </div>
    )
}