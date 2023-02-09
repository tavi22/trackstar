import { configureStore } from '@reduxjs/toolkit';
import { blogsApi } from './services/blogsApi';
import { foldersApi } from './services/foldersApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { transactionsApi } from './services/transactionsApi';

export const store = configureStore({
    reducer: {
        [blogsApi.reducerPath]: blogsApi.reducer,
        [foldersApi.reducerPath]: foldersApi.reducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }).concat(blogsApi.middleware)
        .concat(foldersApi.middleware)
        .concat(transactionsApi.middleware),
});

setupListeners(store.dispatch);