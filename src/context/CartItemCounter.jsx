import { createContext, useEffect, useState } from "react";

export const CartItemCounter = createContext();

const CounterProvider = ({ children }) => {
    let [counter, setCounter] = useState(0),
        [items, setItems] = useState([]);

    let getItem = () => {
        fetch(`http://localhost:1111/cart`).then(res => res.json()).then(data => setItems(data))
    }

    // useEffect(() => {
        
    // }, [])

    let handleCounter = () => {
        getItem();
        setCounter(counter = items.length);
    }

    return(
        <CartItemCounter.Provider value={{counter, handleCounter}}>
            {children}
        </CartItemCounter.Provider>
    )

}

export default CounterProvider;