import { createSlice } from '@reduxjs/toolkit';
import { uploadMedia } from '../action';
import { StoreSlice } from '../../const';

const initialState = {
  loading: false,
  error: null,
  success: false,
}

export const uploadMediaSlice = createSlice({
  name: StoreSlice.Upload,
  initialState,
  reducers: {}
  ,
  extraReducers(builder) {
    builder
      .addCase(uploadMedia.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      });
  }
});


