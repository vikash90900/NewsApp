import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';

const DashboardPlaceholder = () => (
  <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
    <Badge variant="primary">Foundation Ready</Badge>
    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
      News Dashboard Hub
    </h1>
    <p style={{ color: 'var(--color-subtle)', fontSize: '1.1rem', marginBottom: '2rem' }}>
      Application foundation, layout, tokens, API layer, and router authentication are successfully initialized.
    </p>
    <Card style={{ backgroundColor: '#FFFFFF', textAlign: 'left', padding: '2rem' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Dashboard Architecture Status
      </h3>
      <ul style={{ listStyle: 'square', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text)' }}>
        <li>✅ React Frontend Application Structure Initialized</li>
        <li>✅ NewsHub Design Tokens & Typography Configured</li>
        <li>✅ Reusable UI Components (Button, Card, Input, Modal, Badge) Ready</li>
        <li>✅ JWT Auth Context & Axios API Service Active</li>
        <li>✅ Responsive Layout Framework (Navbar, Footer, MainLayout) Enabled</li>
      </ul>
    </Card>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPlaceholder />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
