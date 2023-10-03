import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
}

const languageSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        arabic: state => {
            state.language = state.language === "en" ? "ar" : "en";
        },
    }
})

export default languageSlice.reducer
export const { arabic } = languageSlice.actions