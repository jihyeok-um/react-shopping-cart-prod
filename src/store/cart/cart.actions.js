import axios from 'axios';

import handleErrorLog from '../../utils/error';

import { SERVER_PATH } from '../../constants';

const actionTypes = {
  GET_CART: 'GET_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',

  ADD_CART: 'ADD_CART',
  ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
  ADD_CART_ERROR: 'ADD_CART_ERROR',

  DELETE_CART: 'DELETE_CART',
  DELETE_CART_SUCCESS: 'DELETE_CART_SUCCESS',
  DELETE_CART_ERROR: 'DELETE_CART_ERROR',

  UPDATE_ITEM_QUANTITY: 'UPDATE_ITEM_QUANTITY',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_SUCCESS',
  UPDATE_ITEM_QUANTITY_ERROR: 'UPDATE_ITEM_QUANTITY_ERROR',
};

const getCartItemListAsync = (accessToken) => async (dispatch) => {
  try {
    const { data } = await axios.get(SERVER_PATH.CART, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({
      type: actionTypes.GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    handleErrorLog(error);
    dispatch({ type: actionTypes.GET_CART_ERROR });
    alert(error.response.data.message);
  }
};

const addCartItemAsync = (id, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_CART });
    await axios.post(`${SERVER_PATH.CART_PRODUCT}/${id}`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { data } = await axios.get(SERVER_PATH.CART, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({
      type: actionTypes.ADD_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    handleErrorLog(error);
    alert(error.response.data.message);
    dispatch({ type: actionTypes.ADD_CART_ERROR });
  }
};

const deleteCartItemAsync = (id, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_CART });
    await axios.delete(`${SERVER_PATH.CART_PRODUCT}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { data } = await axios.get(SERVER_PATH.CART, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({
      type: actionTypes.DELETE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    handleErrorLog(error);
    alert(error.response.data.message);
    dispatch({ type: actionTypes.DELETE_CART_ERROR });
  }
};

const updateItemQuantityAsync = (id, quantity, accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY });
    await axios.patch(
      `${SERVER_PATH.CART_PRODUCT}/${id}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const { data } = await axios.get(SERVER_PATH.CART, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({
      type: actionTypes.UPDATE_ITEM_QUANTITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    alert(error.response.data.message);
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY_ERROR });
  }
};

export {
  getCartItemListAsync,
  addCartItemAsync,
  deleteCartItemAsync,
  updateItemQuantityAsync,
  actionTypes,
};
