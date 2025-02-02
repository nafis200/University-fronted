import { configureStore } from '@reduxjs/toolkit'
// import authSlice from '../src/redux/features/auth/authSlice';

import {authReducer} from '../src/redux/features/auth/authSlice';

export const store = configureStore({
  reducer: {

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// first paste it from docs

// then create baseApi

// Now make authSlice

// 2nd-part

export const store = configureStore({
    reducer: {
       auth: authReducer  
    },
  })
   

// then make a baseApi  3 ta part ditei hobe

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),

  endpoints: () => ({}),
});


//  Now make a login form





// Now go to redux persist docs


import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

//  they use normal persistor so it is another big problem.



// mix +++++++++++++++++++++ persistor

export const store = configureStore({
    reducer: {
       [baseApi.reducerPath]: baseApi.reducer,   
    //    connect backend route
       auth: authReducer  
    },
    middleware:(getDefaultMiddlewares)=>
        getDefaultMiddlewares().concat(baseApi.middleware)
  })


//  No add

const persistConfig = {
    key: 'auth',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, authReducer)

  export const store = configureStore({
    reducer: {
       [baseApi.reducerPath]: baseApi.reducer,   
    //    connect backend route
    //    auth: authReducer  replace it  
       auth: persistedReducer
    },
    middleware:(getDefaultMiddlewares)=>
        getDefaultMiddlewares().concat(baseApi.middleware)
  })




//   now i pass this store

export const persistor = persistStore(store); import from docs


// 27-9 Serializable and Non-serializable

give error above code so we solve it.



export const store = configureStore({
    reducer: {
       [baseApi.reducerPath]: baseApi.reducer,   
    //    connect backend route
    //    auth: authReducer  replace it  
       auth: persistedReducer
    },
    middleware:(getDefaultMiddlewares)=>
        getDefaultMiddlewares( serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },).concat(baseApi.middleware)
  })

//   search redux-persist and go to useRedux persisit
