import { combineReducers } from '@reduxjs/toolkit';
import { StoreSlice } from '../const';
import { authUserProcessSlice } from './auth-user-process/auth-user-process';
import { uploadMediaSlice } from './upload-media/upload-media';

export const reducer = combineReducers({
  [StoreSlice.User]: authUserProcessSlice.reducer,
  [StoreSlice.Upload]: uploadMediaSlice.reducer,
});