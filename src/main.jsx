import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ✅ Import your AuthProvider
import AuthProvider from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ Wrap App inside AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
