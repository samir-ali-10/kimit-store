import { configureStore } from "@reduxjs/toolkit";
import langReducer from "../features/langauge/languageSlice"
import cartReducer, { getTotals } from "../features/cart/cartSlice"

const store = configureStore({
    reducer: {
        lang: langReducer,
        cart: cartReducer
    }
})

store.dispatch(getTotals());

export default store;