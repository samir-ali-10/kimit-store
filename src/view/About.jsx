import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function About() {

    let [lists, setLists] = useState(["A World Of Choice", "Quality Assurance", "Exceptional Customer Service", "Secure Shopping", "Fast and Reliable Shipping", "Hassle-Free Returns"])

    return (
        <>
            <Nav />
            <div className='about'>
                <div className="about_us">
                    <h1 className='heading'>About Us</h1>
                    <p>Welcome to Kimit Store, where your online shopping journey begins!</p>
                    <p>At Kimit Store, we believe that shopping should be convenient, enjoyable, and tailored to your unique preferences. Whether you're looking for the latest fashion trends, cutting-edge gadgets, home essentials, or specialty gifts, we've got you covered.</p>
                </div>
                <div className="section_one">
                    <h1 className='heading'>Why Choose Kimit Store?</h1>
                    <ul>
                        {
                            lists.map((list, index) =>
                                <>
                                    <li key={index}><span className='list_style'>{index + 1}</span>{list}</li>
                                    <p> Explore a vast selection of products from leading brands and trusted sellers, all in one place. From fashion-forward clothing to the latest tech gadgets, we offer an extensive range of items to suit every taste and need.</p>
                                </>
                            )
                        }
                    </ul>
                </div>
                <div className="section_two">
                    <h1 className="heading">Shop With Confidence</h1>
                    <p>At Kimit Store, we are passionate about providing an exceptional online shopping experience. We are dedicated to helping you discover the products you love and simplifying your shopping journey.</p>
                    <p>Thank you for choosing Kimit Store as your trusted online shopping destination. Start exploring our website today and unlock a world of possibilities!</p>
                    <p>Your satisfaction is our success, and we look forward to serving you.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}
