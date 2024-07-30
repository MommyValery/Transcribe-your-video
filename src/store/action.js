import { createAsyncThunk } from '@reduxjs/toolkit';
import { dropToken, getToken, saveToken } from '../utils/token';
import axios from "axios";

const API_BASE_URL = 'https://4bf70e86-e7d4-4ae4-b0b7-48b11522bd53.mock.pstmn.io/users';
 
export const Action = {
  CHECK_AUTH: 'user/checkAuth',
  SIGN_UP: 'user/signUp',
  LOGIN_USER: 'user/login',
  LOGOUT: 'user/logout',
  UPLOAD_MEDIA: 'media/upload'
};

export const loginAction = createAsyncThunk(
  Action.LOGIN_USER,
  async ({ email, password }) => {
        try {
        const response = await axios.post(`${API_BASE_URL}/sign-in`, {
           email, 
           password
       });
       saveToken(token);
       return response.data;
        } catch (error) {
           console.error('Error message:', error);
           return error.response.data || {};
        }
  }
);


export const logoutAction = createAsyncThunk(
  Action.LOGOUT,
  async () => {
    await axios.delete({headers: { Authorization: authorizationToken }});
    dropToken();
  }
);

export const signUpAction = createAsyncThunk(Action.SIGN_UP, 
    async (data) => {
      try {
          const response = await axios.post(`${API_BASE_URL}/sign-up/`, data, {headers: {
            'Content-Type': 'application/json'
          }});
          return response.data;
      } catch (error) {
          console.error('Error message:', error);
          return error.response.data || {};
      }
  })


export const uploadMedia = createAsyncThunk(Action.UPLOAD_MEDIA,
  async (file) => {
   const formData = new FormData();
   formData.append('media', file);
   const response = await axios.post(`${API_BASE_URL}/file/`, {
    method: 'POST',
    body: formData,
   });
   if (!response.ok){
   throw new Error('Failed upload media');
   }
   return await response.json();
  }
)