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
  promocodes: [],
  promocode: null,
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
  name: 'promocode',
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
    getPromoCodesSuccess(state, action) {
      state.isLoading = false;
      state.promocodes = action.payload;
    },

    // GET PRODUCT
    getPromoCodeSuccess(state, action) {
      state.isLoading = false;
      state.promocode = action.payload;
    },

    // DELETE PRODUCT
    deletePromoCode(state, action) {
      state.promocodes = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByPromoCodes(state, action) {
      state.sortBy = action.payload;
    },

    filterPromoCodes(state, action) {
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
export const { deletePromoCode, filterPromoCodes, sortByPromoCodes } = slice.actions;

// ----------------------------------------------------------------------

export function getPromoCodes() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await request('get', ADMIN_URLS.admin_promo_code);
      console.log(response.data.data);
      dispatch(slice.actions.getPromoCodesSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPromoCode(name) {
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
