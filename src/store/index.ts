import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlcie';

const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer
  },
  middleware: (getDefaultMiddleware) =>   
    getDefaultMiddleware({ serializableCheck: false }).concat()
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;