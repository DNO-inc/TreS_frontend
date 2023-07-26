import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/api";
// import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    // user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export { store };
