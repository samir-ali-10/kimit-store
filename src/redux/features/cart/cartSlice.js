import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    quantity: 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.quantity++
        },
        deleteFromCart: (state) => {
            state.quantity--
        }
    }
})

export default cartSlice.reducer
export const {addToCart, deleteFromCart} = cartSlice.actions