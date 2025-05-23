import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
//import DashboardLayout from '../layouts/DashboardLayout.tsx';
import Home from '../pages/Home/Home.tsx';
import About from'../pages/About/About.tsx';
import Auth from'../pages/Auth/Auth.tsx';
import Contact from '../pages/Contact/Contact.tsx';
import Blogs from '../pages/Blogs/Blogs.tsx';
import Planning from '../pages/Planning/Planning.tsx';
import Service from '../pages/Service/Service.tsx';
import ConfirmEmailPage from '../pages/Auth/component/ConfirmEmailPage.tsx';
import Services from '../pages/Service/Services.tsx';
import Blog from '../pages/Blogs/Blog.tsx';
import Profile from '../pages/Profile/Profile.tsx';
import Cart from '../pages/Cart/Cart.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
        <Route path="/planning" element={<MainLayout><Planning/></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/service/:id" element={<MainLayout><Service /></MainLayout>} />
        <Route path="/confirm" element={<ConfirmEmailPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
