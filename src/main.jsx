import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'; // Agar store folder ke andar store.js hai
import App from './App';
import './index.css';
import { AuthProvider } from 'react-oauth2-code-pkce';
// Jis file mein aapne authConfig banaya hai, uska sahi path yahan likhein
import { authConfig } from './authConfig' // <-- Ye line add karein


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider authConfig={authConfig}>
  
    <Provider store={store}>
      <App />
    </Provider>
    </AuthProvider>
  
);
