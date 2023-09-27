import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

export default function AddProduct() {
    let [title, setTitle] = useState(""),
        [price, setPrice] = useState(""),
        [description, setDescription] = useState(""),
        [images, setImages] = useState([]);

    let navigate = useNavigate();

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
        else if (e.target.name === "image") {
            setImages([...images, e.target.value])
        }
    }

    async function postData() {
        let response = await fetch(`http://localhost:1111/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title,
                price,
                description,
                images
            })
        })
        return response.json();

    }

    let handleAddProduct = (e) => {
        postData();
        e.preventDefault();
        navigate("/products");
    }

    let clearFields = () => {
        setTitle("");
        setPrice("");
        setDescription("");
        setImages("");
    }

    return (
        <>
            <Nav />
            <div className='add_new_product m-4 mt-0 p-4'>
                <h2 className='title mb-5'>Add New Product</h2>
                <Form onSubmit={(e) => handleAddProduct(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Title</Form.Label>
                        <Form.Control type="text" name='title' placeholder='Title' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control type="text" name='image' placeholder='Image' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Price</Form.Label>
                        <Form.Control type="number" name='price' placeholder='Price' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name='description' placeholder='Description' onChange={handleChange} />
                    </Form.Group>
                    <Button className='me-3' variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="primary" type="reset" onClick={clearFields}>
                        Clear
                    </Button>
                </Form>
            </div>
        </>
    )
}
