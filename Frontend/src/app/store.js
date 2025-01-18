import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../Service/Auth/authService"
import { apiSlice } from "./api/authApiSlice.js"
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated', 'user'], // Persist only necessary parts of auth state
  };
  
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer:{
        auth: persistedAuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore Redux Persist actions in serializability checks
          },
    }).concat(apiSlice.middleware),
})

// Set up listeners for refetching on focus or reconnect
setupListeners(store.dispatch);


export const persistor = persistStore(store);

export default store;