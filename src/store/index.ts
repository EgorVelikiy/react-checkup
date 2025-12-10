import { configureStore } from '@reduxjs/toolkit';
import CitiesReducer from './slices/cities';

const store = configureStore({
  reducer: {
    cities: CitiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;