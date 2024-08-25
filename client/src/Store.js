import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
} from "./Reducers/productsReducers";
import { authReducer } from "./Reducers/userReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer, // add the productDetails reducer here as well

  auth: authReducer,
});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
