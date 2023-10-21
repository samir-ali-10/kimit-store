import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    item: [],
    status: null,
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async() => {
        const response = await axios.get("http://localhost:5000/products")
        return response?.data;
    }
)


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending";
        }
        ,[productsFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.item = action.payload;
        }
        ,[productsFetch.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
})

export default productsSlice.reducer