import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import langReducer from "../features/langauge/languageSlice"
import cartReducer, { getTotals } from "../features/cart/cartSlice"
import productsReducer, { productsFetch } from "../features/products/productsSlice";
import { productsApi } from "../features/products/productsApi";

const store = configureStore({
    reducer: {
        lang: langReducer,
        cart: cartReducer,
        products: productsReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch());

export default store;