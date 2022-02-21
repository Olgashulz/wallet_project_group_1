import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./user";
import { transactionsSlice } from "./transactions";
import { categoriesSlice } from "./categories";

import modalReduser from "./modal/modalReduser";
// import formReducer from './form/formRedusers';
import modalLogoutReduser from "./modalLogout/modalLogoutReduser";
import { teamSlice } from "./team";

const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const userPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"],
};

// const transactionsPersistConfig = {
//   key: 'transactions',
//   storage,
// };

export const store = configureStore({
  reducer: {
    session: persistReducer(userPersistConfig, userSlice),
    // transactions: persistReducer(transactionsPersistConfig, formReducer),
    transactions: transactionsSlice,
    categories: categoriesSlice,
    modal: modalReduser,
    isModalLogoutOpen: modalLogoutReduser,
    developers: teamSlice
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
