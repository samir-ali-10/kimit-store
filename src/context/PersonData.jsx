import { createContext, useState } from "react";

export const PersonData = createContext();

const DataProvider = ({ children }) => {

    var [firstName, setFirstName] = useState(localStorage.getItem("fName") ? localStorage.getItem("fName") : null),
        [lastName, setLastName] = useState(localStorage.getItem("lName") ? localStorage.getItem("lName") : null),
        [email, setEmail] = useState(localStorage.getItem("email") ? localStorage.getItem("email") : null),
        [password, setPassword] = useState(""),
        [confPassword, setConfPassword] = useState(""),
        [logged, setLogged] = useState(localStorage.getItem("logged") ? localStorage.getItem("logged") : "false");


    let handleChange = (e) => {
        if (e.target.name === "fName") {
            setFirstName(() => localStorage.setItem("fName", e.target.value))
        }
        else if (e.target.name === "lName") {
            setLastName(localStorage.setItem("lName", e.target.value))
        }
        else if (e.target.name === "email") {
            setEmail(localStorage.setItem("email", e.target.value))
        }
        else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        else if (e.target.name === "conf_password") {
            setConfPassword(e.target.value)
        }
    }

    return (
        <PersonData.Provider value={{ firstName, lastName, email, password, setPassword, confPassword, setConfPassword, logged, setLogged, handleChange }}>
            {children}
        </PersonData.Provider>
    );
}

export default DataProvider;