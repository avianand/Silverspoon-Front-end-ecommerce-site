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
  categories: [],
  category: null,
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
  name: 'categories',
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
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    // GET PRODUCT
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.order = action.payload;
    },

    // DELETE PRODUCT
    deleteOrder(state, action) {
      state.categories = reject(state.categories, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByCategories(state, action) {
      state.sortBy = action.payload;
    },

    filterOrders(state, action) {
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
export const { deleteCategory, filterCategories, sortByCategories } = slice.actions;

// ----------------------------------------------------------------------

export function getCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await request('get', ADMIN_URLS.admin_category);
      console.log(response.data.data);
      dispatch(slice.actions.getCategoriesSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCategory(name) {
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
