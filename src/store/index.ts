import { configureStore } from '@reduxjs/toolkit';
import filterFormReducer from './slices/filterFormSlice';

const store = configureStore({
  reducer: {
    filter: filterFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;