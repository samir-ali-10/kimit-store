import { configureStore } from "@reduxjs/toolkit";
import langReducer from "../features/langauge/languageSlice"
import cartReducer from "../features/cart/cartSlice"

const store = configureStore({
    reducer: {
        lang: langReducer,
        cart: cartReducer
    }
})

export default store;