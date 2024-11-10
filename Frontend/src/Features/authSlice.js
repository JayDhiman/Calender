import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import userApi from '../Api/userApi.js';


const initialState = {
  user: null,
  token: Cookies.get('token') || null, // Check cookie for token
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data;
          state.token = payload.token;
          Cookies.set('token', payload.token); // Save token in cookie
        }
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data;
          state.token = payload.token;
          Cookies.set('token', payload.token); // Save token in cookie
        }
      )
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        Cookies.remove('token');
      })
      .addMatcher(userApi.endpoints.getUserDetails.matchFulfilled, (state, { payload }) => {
        state.user = payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
