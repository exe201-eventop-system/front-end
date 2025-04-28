import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import blogReducer from './Blogs/blogSlice';
import serviceReducer from './Services/serviceSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    service: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
