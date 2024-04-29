import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "@/slices/userSlice";
import noteReducer from "@/slices/noteSlice";
import refreshReducer from "@/slices/refreshSlice";

import { UserApi } from "./services/userApi";
import { JournalAPi } from "./services/journalApi";


const persistConfig = {
  key: "journal",
  storage,
  blacklist: [""],
};

const rootReducer = combineReducers({
  [UserApi.reducerPath]: UserApi.reducer,
  [JournalAPi.reducerPath]: JournalAPi.reducer,
  user: userReducer,
  note: noteReducer,
  refresh: refreshReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      UserApi.middleware,
      JournalAPi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
