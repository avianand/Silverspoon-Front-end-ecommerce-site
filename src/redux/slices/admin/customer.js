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
  customers: [],
  customer: null,
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
  name: 'customer',
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
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
    },

    // GET PRODUCT
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    // DELETE PRODUCT
    deleteOrder(state, action) {
      state.customers = reject(state.customers, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByCustomers(state, action) {
      state.sortBy = action.payload;
    },

    filterCustomers(state, action) {
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
export const { deleteCustomer, filterCustomers, sortByCustomers } = slice.actions;

// ----------------------------------------------------------------------

export function getCustomers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await request('get', ADMIN_URLS.admin_customer_url);
      // console.log(response.data.data);
      dispatch(slice.actions.getCustomersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCustomer(name) {
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
