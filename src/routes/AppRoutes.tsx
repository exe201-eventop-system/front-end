import React from 'react';
import { BrowserRouter as Router, Route, Routes /* Link */ } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import DashboardLayout from '../layouts/DashboardLayout.tsx';
import Home from '../pages/Home/Home.tsx';
import About from '../pages/About/About.tsx';
import Auth from '../pages/Auth/Auth.tsx';
import Contact from '../pages/Contact/Contact.tsx';
import Blogs from '../pages/Blogs/Blogs.tsx';
import Planning from '../pages/Planning/Planning.tsx';
import Service from '../pages/Service/Service.tsx';
import ConfirmEmailPage from '../pages/Auth/component/ConfirmEmailPage.tsx';
//import Services from '../pages/Service/Services.tsx';
import Services from '../pages/Service/Services.tsx';
import Blog from '../pages/Blogs/Blog.tsx';
import Profile from '../pages/Profile/Profile.tsx';
import Cart from '../pages/Cart/Cart.tsx';
import NotFound from '../pages/Error/NotFound.tsx';
import ServerError from '../pages/Error/ServerError.tsx';
import Supplier from '../pages/Supplier/Supplier.tsx';
import Analytics from '../pages/Dashboard/Analytics.tsx';
import SupplierDetail from '../pages/Supplier/SupplierDetail.tsx';
import History from '../pages/History/History.tsx';

// Import new Supplier pages
// import Statistics from '../pages/Supplier/Statistics.tsx';
// import ServiceManagement from '../pages/Supplier/ServiceManagement.tsx';
import ServiceRequests from '../pages/Supplier/ServiceRequests.tsx';
import Feedback from '../pages/Supplier/Feedback.tsx';
import Communication from '../pages/Supplier/Communication.tsx';
import BlogManagement from '../pages/Supplier/BlogManagement.tsx';
import Advertisement from '../pages/Supplier/Advertisement.tsx';

const AppRoutes: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
        <Route path="/planning" element={<MainLayout><Planning /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/service/:id" element={<MainLayout><Service /></MainLayout>} />
        <Route path="/confirm" element={<ConfirmEmailPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/suppliers" element={<MainLayout><Supplier /></MainLayout>} />
        <Route path="/supplier/:id" element={<MainLayout><SupplierDetail /></MainLayout>} />
        <Route path="/history" element={<MainLayout><History /></MainLayout>} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />

        {/* Supplier Routes */}
        {/* <Route path="/supplier/statistics" element={<DashboardLayout><Statistics /></DashboardLayout>} />
        <Route path="/supplier/services" element={<DashboardLayout><ServiceManagement /></DashboardLayout>} />
        <Route path="/supplier/requests" element={<DashboardLayout><ServiceRequests /></DashboardLayout>} />
        <Route path="/supplier/feedback" element={<DashboardLayout><Feedback /></DashboardLayout>} />
        <Route path="/supplier/communication" element={<DashboardLayout><Communication /></DashboardLayout>} />
        <Route path="/supplier/blog" element={<DashboardLayout><BlogManagement /></DashboardLayout>} />
        <Route path="/supplier/advertisement" element={<DashboardLayout><Advertisement /></DashboardLayout>} /> */}

        {/* Error Pages */}
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
