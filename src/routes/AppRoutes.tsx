import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes /* Link */,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import Home from "../pages/Home/Home.tsx";
import About from "../pages/About/About.tsx";
import Auth from "../pages/Auth/Auth.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import Blogs from "../pages/Blogs/Blogs.tsx";
import Planning from "../pages/Planning/Planning.tsx";
import Service from "../pages/Service/Service.tsx";
import ConfirmEmailPage from "../pages/Auth/component/ConfirmEmailPage.tsx";
import Services from "../pages/Service/Services.tsx";
import Blog from "../pages/Blogs/Blog.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import Cart from "../pages/Cart/Cart.tsx";
import NotFound from "../pages/Error/NotFound.tsx";
import ServerError from "../pages/Error/ServerError.tsx";
import Supplier from "../pages/Supplier/Suppliers.tsx";
import Analytics from "../pages/Dashboard/Admin/Analytics.tsx";
import SupplierDetail from "../pages/Supplier/SupplierDetail.tsx";
import History from "../pages/History/History.tsx";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoute";
import Schedule from "../pages/Dashboard/Supplier/Schedule";
import { UserRole } from "../types/Auth/User.type.ts";
import DashboardSupplier from "../pages/Dashboard/Supplier/DashboardSupplier.tsx";
import Transaction from "../pages/Dashboard/Admin/Transaction.tsx";
import Feedback from "../pages/Dashboard/Admin/Feedback.tsx";
import BlogManagement from "../pages/Dashboard/Supplier/Blog/BlogManagement.tsx";
import UserManagement from "../pages/Dashboard/Admin/UserManagement.tsx";
import ProductManagement from "../pages/Dashboard/Supplier/Service/ProductMagement.tsx";
import ManagementSupplier from "../pages/Dashboard/Inspector/ManagementSuplier.tsx";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <Blogs />
            </MainLayout>
          }
        />
        <Route
          path="/planning"
          element={
            <MainLayout>
              <Planning />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        <Route
          path="/service-management"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Supplier]}>
              <DashboardLayout>
                <ProductManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <Services />
            </MainLayout>
          }
        />
        <Route
          path="/service/:id"
          element={
            <MainLayout>
              <Service />
            </MainLayout>
          }
        />
        <Route path="/confirm" element={<ConfirmEmailPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/suppliers"
          element={
            <MainLayout>
              <Supplier />
            </MainLayout>
          }
        />
        <Route
          path="/supplier/:id"
          element={
            <MainLayout>
              <SupplierDetail />
            </MainLayout>
          }
        />
        <Route
          path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />
        <Route
          path="/payment-success"
          element={
            <MainLayout>
              <PaymentSuccess />
            </MainLayout>
          }
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin]}>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-feedback"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin]}>
              <DashboardLayout>
                <Feedback />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin, UserRole.Demo]}>
              <DashboardLayout>
                <Transaction />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/management-user"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Admin]}>
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/management-supplier"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Inspector]}>
              <DashboardLayout>
                <ManagementSupplier />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/schedule"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Supplier]}>
              <DashboardLayout>
                <Schedule />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/management-service"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Supplier]}>
              <DashboardLayout>
                <ProductManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/management-blog"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Supplier]}>
              <DashboardLayout>
                <BlogManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/dashboard"
          element={
            <ProtectedRoute allowedRoles={[UserRole.Supplier]}>
              <DashboardLayout>
                <DashboardSupplier />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Error Pages */}
        <Route path="/500" element={<ServerError />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
