import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PersonData } from '../context/PersonData';

export default function Login() {

    let navigate = useNavigate();

    let handleSubmit = (e) => {
        e.preventDefault();
    }

    let sendData = () => {
        if(data.email !== "" && data.password !== "") {
            localStorage.setItem("logged", data.setLogged("true"))
            navigate("/products");
        }
        else {
            return
        }
    }

    let data = useContext(PersonData);

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h2>Kimit Store</h2>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" required value={data.email} name="email" placeholder='Enter Your Email' onChange={data.handleChange} />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" required value={data.password} name="password" placeholder='Enter Your Password' onChange={data.handleChange} />
                </div>
                <input className='submit w-100' type="submit" value="Login" onClick={sendData} />
                <NavLink to="/register">Don't Have An Account?</NavLink>
            </form>
        </div>
    )
}
