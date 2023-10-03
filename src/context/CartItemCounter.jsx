import { createContext, useCallback, useEffect, useState } from "react";

export const CartItemCounter = createContext();

const CounterProvider = ({ children }) => {
    let [items, setItems] = useState([]);

    let getItem = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    let callBack = useCallback(getItem, [items])

    let [counter, setCounter] = useState(0);

    let increment = () => {
        setCounter((prev) => prev + 1 );
    }

    let decrement = () => {
        setCounter((prev) => (prev > 0 ? --prev : counter));
    }

    // useEffect(() => {

    // }, [])

    return (
        <CartItemCounter.Provider value={{callBack, counter, increment, decrement}}>
            {children}
        </CartItemCounter.Provider>
    )

}

export default CounterProvider;