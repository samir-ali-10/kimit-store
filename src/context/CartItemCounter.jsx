import { createContext, useCallback, useEffect, useState } from "react";

export const CartItemCounter = createContext();

const CounterProvider = ({ children }) => {
    let [items, setItems] = useState([]);

    let getItem = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    let callBack = useCallback(getItem, [items])

    // useEffect(() => {

    // }, [])

    return (
        <CartItemCounter.Provider value={{callBack}}>
            {children}
        </CartItemCounter.Provider>
    )

}

export default CounterProvider;