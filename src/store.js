import { configureStore } from '@reduxjs/toolkit';
import { blogsApi } from './services/blogsApi';
import { foldersApi } from './services/foldersApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [blogsApi.reducerPath]: blogsApi.reducer,
        [foldersApi.reducerPath]: foldersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }).concat(blogsApi.middleware)
        .concat(foldersApi.middleware),
});

setupListeners(store.dispatch);