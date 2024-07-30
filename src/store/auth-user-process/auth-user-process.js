import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, StoreSlice } from '../../const';
import { loginAction, signUpAction, logoutAction } from '../action';

const initialState = {
  authStatus: AuthorizationStatus.Auth,
  user: '',
};

export const authUserProcessSlice = createSlice({
  name: StoreSlice.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.No_Auth;
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(signUpAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.No_Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.No_Auth;
        state.user = '';
      });
  }
});