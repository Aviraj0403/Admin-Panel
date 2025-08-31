import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react';

// ✅ Import your AuthProvider
import AuthProvider from './context/AuthContext';
import  WindowContextProvider  from './context/windowContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ Wrap App inside AuthProvider */}
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <AuthProvider>
      <WindowContextProvider>
      <App />
       </WindowContextProvider>
    </AuthProvider>
    </PersistGate>
      </Provider>
  </StrictMode>
);
