import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { CookieProvider } from './components/gdpr/CookieContext';
import App from './App.tsx';
import './index.css';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <HelmetProvider>
      <CookieProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookieProvider>
    </HelmetProvider>
  </StrictMode>
);
