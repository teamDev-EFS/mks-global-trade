import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { AdminAuthProvider } from './context/AdminAuthContext';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AdminAuthProvider>
        <App />
        <ToastContainer position="top-right" theme="colored" autoClose={4000} />
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
