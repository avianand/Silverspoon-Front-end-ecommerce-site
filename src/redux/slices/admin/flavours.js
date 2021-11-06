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
  flavours: [],
  category: null,
  sortBy: null,
  filters: {
    name: '',
    price: '',
    createdAt: ''
  }
};

const slice = createSlice({
  name: 'flavours',
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
    getFlavoursSuccess(state, action) {
      state.isLoading = false;
      state.flavours = action.payload;
    },

    // GET PRODUCT
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.flavour = action.payload;
    },

    // DELETE PRODUCT
    deleteFlavour(state, action) {
      state.flavours = reject(state.flavours, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByFlavours(state, action) {
      state.sortBy = action.payload;
    },

    filterFlavours(state, action) {
      state.filters.name = action.payload.name;
      state.filters.price = action.payload.price;
      state.filters.createdAt = action.payload.createdAt;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteFlavour, filterFlavours, sortByFlavours } = slice.actions;

// ----------------------------------------------------------------------

export function getFlavours() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await request('get', ADMIN_URLS.admin_flavour);
      // console.log(response.data.data);
      dispatch(slice.actions.getFlavoursSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFlavour(name) {
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
