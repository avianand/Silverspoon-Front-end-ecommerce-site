import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../../utils/axios';
import { ADMIN_URLS } from '../../../_apis_/urls';
import request from '../../../utils/request';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  customOrders: [],
  customOrder: null,
  sortBy: null,
  filters: {
    hasEgg: '',
    isCake: '',
    price: '',
    category: 'All',
    createdAt: ''
  }
};

const slice = createSlice({
  name: 'customorder',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getCustomOrdersSuccess(state, action) {
      state.isLoading = false;
      state.customOrders = action.payload;
    },

    // GET PRODUCT
    getCustomOrderSuccess(state, action) {
      state.isLoading = false;
      state.customOrder = action.payload;
    },

    // DELETE PRODUCT
    deleteOrder(state, action) {
      state.customOrders = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByCustomOrders(state, action) {
      state.sortBy = action.payload;
    },

    filterCustomOrders(state, action) {
      state.filters.hasEgg = action.payload.hasEgg;
      state.filters.category = action.payload.category;
      state.filters.isCake = action.payload.isCake;
      state.filters.price = action.payload.price;
      state.filters.createdAt = action.payload.createdAt;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteCustomOrder, filterCustomOrders, sortByCustomOrders } = slice.actions;

// ----------------------------------------------------------------------

export function getCustomOrders() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await request('get', ADMIN_URLS.admin_custom_order);
      // console.log(response.data.data);
      dispatch(slice.actions.getCustomOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCustomOrder(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products/product', {
        params: { name }
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
