import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Nav from '../components/Nav';

export default function EditProduct() {

    let { t } = useTranslation();

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
        <>
            <Nav />
            <div className='edit_products p-5'>
                <div className="heading d-flex justify-content-between align-items-center">
                    <h1 className='mb-3 bg-info'>{t("edit_product")}</h1>
                    <div className="product_info d-flex">
                        <h4 className='mb-3 bg-info'>{t("product_name")}: {product.title}</h4>
                        <h4 className='mb-3 bg-info'>{t("product_number")}: {product.id}</h4>
                    </div>
                </div>
                <Form onSubmit={(e) => handleEditProduct(e)}>
                    <div className="starter d-flex">
                        <Form.Group className="mb-3 w-50">
                            <Form.Label className='bg-dark mb-3'>{t("product_title")}</Form.Label>
                            <Form.Control type="text" value={title} name='title' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 w-50">
                            <Form.Label className='bg-dark mb-3'>{t("product_price")}</Form.Label>
                            <Form.Control type="number" value={price} name='price' onChange={handleChange} />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label className='bg-dark mb-3'>{t("product_desc")}</Form.Label>
                        <Form.Control as="textarea" value={description} rows={3} name='description' onChange={handleChange} />
                    </Form.Group>
                    <Button className='me-3 text-white' variant="info" type="submit">
                        {t("submit")}
                    </Button>
                    <Button className='me-3' variant="dark" type="reset" onClick={clearFields}>
                        {t("clear")}
                    </Button>
                </Form>
            </div>
        </>
    )
}
