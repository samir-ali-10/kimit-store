import counterReducer from "./reducers/counterReducer";
import { createStore } from "redux";

const store = createStore(counterReducer);

export default store;   