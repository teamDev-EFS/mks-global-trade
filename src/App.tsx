import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Insights from './pages/Insights';
import InsightPost from './pages/InsightPost';
import RequireAdmin from './components/admin/RequireAdmin';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminEnquiryDetailPage from './pages/admin/AdminEnquiryDetailPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="enquiries/:id" element={<AdminEnquiryDetailPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/services/:sectionSlug?" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightPost />} />
      </Route>
    </Routes>
  );
};

export default App;
