import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";


const composeEnhancers = composeWithDevTools({});

//pahum enk local storage um vor refresh anelis chpoxi
const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [], 
  },
};

export const store = createStore(rootReducer, initialStore, composeEnhancers());
//2:33