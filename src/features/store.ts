import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import blogReducer from './Blogs/blogSlice';
import serviceReducer from './Services/serviceSlice'
import planningReducer from './Planning/planningSlice'
import cartReducer from './Cart/cartSlice'
import scheduleReducer from './Schedule/scheduleSlice'
import bookingReducer from './Booking/bookingSlice';
import transactionReducer from './Cart/transactionSlice';
import userReducer from './User/userSlice';
import supplierReducer from './Supplier/supplierSlice';
import feedbackReducer from './Cart/feedbackSlice';
import dashboardReducer from './Dashboard/dashboardSlice';
import categoryReducer from './Category/categorySlice';
import packagesReducer from './Pagekages/packagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    service: serviceReducer,
    planning: planningReducer,
    cart: cartReducer,
    schedule: scheduleReducer,
    booking: bookingReducer,
    transaction: transactionReducer,
    user: userReducer,
    supplier: supplierReducer,
    feedback: feedbackReducer,
    dashboard: dashboardReducer,
    category: categoryReducer,
    packages: packagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
