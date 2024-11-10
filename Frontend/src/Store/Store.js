import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../Features/authSlice.js';
import userApi from '../Api/userApi';
import eventsApi  from '../Api/eventsApi.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventsApi.middleware 
      ),
});

setupListeners(store.dispatch);

export default store;
