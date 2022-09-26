import {CookiesProvider} from 'react-cookie';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter} from 'react-router-dom';
import "./index.css";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
  </CookiesProvider>
 
);

