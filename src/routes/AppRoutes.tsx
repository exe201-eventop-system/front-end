import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import Home from '../pages/Home/Home.tsx';
import About from'../pages/About/About.tsx';
import Auth from'../pages/Auth/Auth.tsx';
import Contact from '../pages/Contact/Contact.tsx';
import Blogs from '../pages/Blogs/Blogs.tsx';
import Service from '../pages/Service/Service.tsx';
import Services from '../pages/Service/Services.tsx';
import Blog from '../pages/Blogs/Blog.tsx';
import Profile from '../pages/Profile/Profile.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/service/:id" element={<MainLayout><Service /></MainLayout>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
