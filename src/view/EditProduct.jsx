import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function EditProduct() {

    let [product, setProduct] = useState({}),
        [title, setTitle] = useState(),
        [price, setPrice] = useState(),
        [description, setDescription] = useState();

    let navigate = useNavigate();

    let params = useParams();

    let getProduct = () => {
        fetch(`http://localhost:1111/products/${params.productId}`).then(res => res.json()).then(data => {
            setProduct(data)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
        })
    }

    let handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        }
        else if (e.target.name === "price") {
            setPrice(e.target.value)
        }
        else if (e.target.name === "description") {
            setDescription(e.target.value)
        }
    }

    let clearFields = () => {
        setTitle("")
        setPrice("")
        setDescription("")
    }

    async function postData() {
        let response = await fetch(`http://localhost:1111/products/${params.productId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                ...product,
                title,
                price,
                description
            })
        })
        return response.json();

    }

    useEffect(() => {
        getProduct();
    }, [params.productId])

    let handleEditProduct = (e) => {
        e.preventDefault();
        postData();
        navigate("/products");
    }

    return (
        <div className='edit_products p-5 pt-3'>
            <h1 className='mb-3'>Edit Product</h1>
            <h4 className='mb-3'>Product Name: {product.title}</h4>
            <h4 className='mb-3'>Product Number: {product.id}</h4>
            <Form onSubmit={(e) => handleEditProduct(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control type="text" value={title} name='title' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" value={price} name='price' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" value={description} rows={3} name='description' onChange={handleChange} />
                </Form.Group>
                <Button className='me-3' variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" type="reset" onClick={clearFields}>
                    Clear
                </Button>
            </Form>
        </div>
    )
}
