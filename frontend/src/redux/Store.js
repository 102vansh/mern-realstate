// import {configureStore} from '@reduxjs/toolkit'

// import userReducer from './UserSlice'
// import storage from 'redux-persist/lib/storage'
// import {combineReducers} from 'redux'
// import {persistReducer} from 'redux-persist'
// const rootreducer = combineReducers({
//     user: userReducer
// })
// const persistConfig = {
//     key: 'root',
//     storage,
//     version:1,

// }
// const persistreducer = persistReducer(persistConfig, rootreducer)
// export const store = configureStore({
//     reducer: persistreducer,
        
    
//     middleware: (getDefaultMiddleware) => {
//         return getDefaultMiddleware({
//             serializableCheck: false
//         })
//     }
// })
// export const persistor = persistReducer(store)

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './UserSlice';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Create persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
