import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Layout (not lazy — needed immediately)
import MainLayout from './layouts/MainLayout';

// Lazy loaded pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Comments = React.lazy(() => import('./pages/Comments'));
const Contact = React.lazy(() => import('./pages/Contact'));
const DonationSettings = React.lazy(() => import('./pages/DonationSettings'));
const Donations = React.lazy(() => import('./pages/eservices/Donations'));
const Events = React.lazy(() => import('./pages/Events'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

export function AdminContent() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes inside MainLayout */}
          <Route path="" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog/*" element={<Blog />} />
            <Route path="comments" element={<Comments />} />
            <Route path="donation" element={<Donations />} />
            <Route path="contact" element={<Contact />} />
            <Route path="donation-settings" element={<DonationSettings />} />
            <Route path="events" element={<Events />} />
            {/* 404 - shows "Go to Dashboard" when auth, "Go to Login" when not (via MainLayout redirect) */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/*" element={<AdminContent />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
