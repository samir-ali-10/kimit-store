import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { PersonData } from '../context/PersonData';

export default function Register() {

    let data = useContext(PersonData);

    let navigate = useNavigate()

    let [errorPass, setErrorPass] = useState(false);

    let handleSubmit = (e) => {
        e.preventDefault();
    }

    let checkPasswords = () => {
        if (data.password === data.confPassword && data.password !== "" && data.confPassword !== "") {
            setErrorPass(false);
            navigate("/")
        }
        else {
            setErrorPass(true);
        }
    }

    let clearFields = () => {
        data.setPassword("");
        data.setConfPassword("");
    }



    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="first_name">
                    <label htmlFor="fName">First Name</label>
                    <input type="text" value={data.firstName} name="fName" placeholder='Enter Your First Name' onChange={data.handleChange} />
                </div>
                <div className="last_name">
                    <label htmlFor="lName">Last Name</label>
                    <input type="text" value={data.lastName} name="lName" placeholder='Enter Your Last Name' onChange={data.handleChange} />
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={data.email} name="email" placeholder='Enter Your Email' onChange={data.handleChange} />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" required value={data.password} name="password" placeholder='Enter Your Password' onChange={data.handleChange} />
                </div>
                <div className="conf_password">
                    <label htmlFor="conf_password">Confirm Password</label>
                    <input type="password" required value={data.confPassword} name="conf_password" placeholder='Confirm Password' onChange={data.handleChange} />
                </div>
                {
                    errorPass === true ? <div className="password_error">
                        <p className='m-0'>Passwords Don't Match</p>
                    </div> : ""
                }
                <input className='submit w-100' type="submit" value="Sign Up" onClick={() => {
                    checkPasswords()
                    clearFields()
                }} />
                <NavLink to="/" onClick={clearFields}>Already Have An Account?</NavLink>
            </form>
        </div>
    )
}
