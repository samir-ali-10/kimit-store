import { CHANGETOARABIC } from "../actions/types";

const langState = {
    language: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
}

const counterReducer = (state = langState, action) => {
    switch (action.type) {
        case CHANGETOARABIC:
            return {...state, language: state.language = state.language === "en" ? "ar" : "en" }
        default:
            return state;
    }
}
export default counterReducer;