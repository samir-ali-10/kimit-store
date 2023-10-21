import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const singleProduct = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (id) => `products/${id}`,
        })
    })
})

export const {useGetAllSingleProductQuery} = singleProduct;