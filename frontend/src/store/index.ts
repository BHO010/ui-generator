import { configureStore } from "@reduxjs/toolkit";
import { generatorApi } from "../features/generator/generatorApi";
import generatorReducer from "../features/generator/generatorSlice";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    generator: generatorReducer,
    theme: themeReducer,
    [generatorApi.reducerPath]: generatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generatorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
