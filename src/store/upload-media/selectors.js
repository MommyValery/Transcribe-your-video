import { StoreSlice } from '../../const';

export const getLoading = (state) => state[StoreSlice.Upload].loading;
export const getSuccess = (state) => state[StoreSlice.Upload].success;
export const getError = (state) => state[StoreSlice.Upload].error;
