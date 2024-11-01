import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userApi from '../Api/userApi.js'; // Ensure this is the correct path

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Correctly add userApi's reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Correctly add userApi's middleware
});

// Optional: Setup listeners for RTK Query caching
setupListeners(store.dispatch);

export default store;
