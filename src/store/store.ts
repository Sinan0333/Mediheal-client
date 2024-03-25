import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slice/userSlice';
import adminSlice from './slice/adminSlice';
import doctorSlice from './slice/doctorSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','admin','doctor']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  user: userSlice,
  admin: adminSlice,
  doctor: doctorSlice,
}));

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export default store;
