import axios from "axios";
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../contants/productsConstants";

const API_URL = `http://localhost:4000`;

export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 1000], //price must be an arr esle internal server err. then uncomment error.js lline 24 to debug
    category
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link = `${API_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
      if (category) {
        link = `${link}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: errorMessage,
      });
    }
  };
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// import axios from "axios";
// import {
//   ALL_PRODUCTS_FAIL,
//   ALL_PRODUCTS_REQUEST,
//   ALL_PRODUCTS_SUCCESS,
//   CLEAR_ERRORS,
// } from "../contants/productsConstants";

// const API_URL = `http://localhost:4000`;
// export const getProducts = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_PRODUCTS_REQUEST });

//     const { data } = await axios.get(`http://localhost:4000/api/v1/products`);
//     dispatch({
//       type: ALL_PRODUCTS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_PRODUCTS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };
